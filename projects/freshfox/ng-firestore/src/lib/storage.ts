import {from as observableFrom, Observable, Subject} from 'rxjs';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {map} from 'rxjs/operators';
import Firestore = firebase.firestore.Firestore;
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import CollectionReference = firebase.firestore.CollectionReference;
import Query = firebase.firestore.Query;

export const FIRESTORE_STORAGE_CONFIG = new InjectionToken('FIRESTORE_STORAGE_CONFIG');

export interface FirestoreStorageConfig {
	persistenceEnabled?: boolean;
	disableTimestamps?: boolean;
	firebase: {
		apiKey: string,
		authDomain: string,
		databaseURL: string,
		projectId: string,
		storageBucket: string,
		messagingSenderId: string
	};
}

@Injectable()
export class FirestoreStorage {

	private readonly app: firebase.app.App;
	public firestore: Firestore;
	public onMultiTabError = new Subject();

	readonly onFatalError = new Subject<any>();
	readonly onWrite = new Subject<{ path: string, data: any }>();

	private static clone(data): { id: string, data } {
		const clone = Object.assign({}, data);

		Object.keys(clone).forEach((key) => {
			if (clone[key] === undefined) {
				delete clone[key];
			}
		});

		const id = data.id;
		delete clone.id;
		delete clone.createdAt;
		delete clone.updatedAt;
		return {
			id,
			data: clone
		};
	}

	private static getPath(collection: string, id: string) {
		return `${collection}/${id}`;
	}

	private static format(snapshot: DocumentSnapshot) {
		if (!snapshot.exists) {
			return null;
		}
		return Object.assign({
			id: snapshot.id
		}, snapshot.data()) as any;
	}

	private static logTiming(diff: number, message: string, resultsCount?: number, logFunction?) {
		let str = `Query [${diff}ms] ${message}`;
		if (resultsCount) {
			str += ` results: ${resultsCount}`;
		}
		if (!logFunction) {
			logFunction = console.log;
		}
		logFunction(str);
	}

	constructor(@Inject(FIRESTORE_STORAGE_CONFIG) private config: FirestoreStorageConfig) {
		this.app = firebase.app();
		if (!this.app) {
			this.app = firebase.initializeApp(this.config.firebase);
		}

		this.initFireStore();
	}

	private initFireStore() {
		this.firestore = this.app.firestore();
		this.firestore.settings({
			cacheSizeBytes: 60000000,
			timestampsInSnapshots: !this.config.disableTimestamps,
		});

		if (this.config.persistenceEnabled) {
			this.app.firestore().enablePersistence()
				.then(() => {
					console.log('Offline persistence enabled');
				})
				.catch((err) => {
					console.error(err);
					if (err.code === 'failed-precondition') {
						this.onMultiTabError.next();
					} else if (err.code === 'unimplemented') {
					} else {
						throw err;
					}
				});

		}
	}

	private observe(query: CollectionReference | DocumentReference | Query | any) {

		const start = Date.now();
		let logged = false;

		const successCallback = (snapshot) => {

			if (!logged) {
				const diff = Date.now() - start;
				logged = true;
				if (query instanceof CollectionReference) {
					FirestoreStorage.logTiming(diff, `collection ${query.path}`, snapshot.size);
				} else if (query instanceof DocumentReference) {
					FirestoreStorage.logTiming(diff, `document ${query.path}`);
				} else {
					const q = query['_query'];
					FirestoreStorage.logTiming(diff, q.path.segments.join('/'), snapshot.size, console.groupCollapsed);
					q.filters.forEach((current) => {
						const field = current.field.segments.join('/');
						const op = current.op.name;
						const value = current.value.internalValue;

						console.log(` => ${field} ${op} ${value}`);
					}, []);
					console.groupEnd();
				}
			}

			return snapshot.docs
				? snapshot.docs.map(FirestoreStorage.format)
				: FirestoreStorage.format(snapshot);
		};

		return new Observable<any>((observer) => {
			// return tear down logic
			return query.onSnapshot((snapshot) => {
				console.log(snapshot);
				const data = successCallback(snapshot);
				observer.next(data);
			}, (error) => {
				console.error(error);
				console.error(query);
				observer.error(error);
				this.onFatalError.next(error);
			}, observer.complete);
		});
	}

	generateId() {
		return this.firestore.collection('any').doc().id;
	}

	deleteIndexedDB() {
		return new Promise((resolve, reject) => {
			if (!window.indexedDB) {
				resolve();
			}

			const request = window.indexedDB.deleteDatabase(`firestore/[DEFAULT]/${this.config.firebase.projectId}/main`);
			request.onerror = reject;
			request.onsuccess = resolve;
		});
	}

	findById(collection: string, id: string) {
		const path = FirestoreStorage.getPath(collection, id);
		const docRef = this.firestore.doc(path);
		return this.observe(docRef);
	}

	find(collection: string, cb: (qb: Query) => Query) {
		return this.query(collection, (qb) => {
			return cb(qb).limit(1);
		}).pipe(map((result) => {
			return result[0] || null;
		}));
	}

	save(collection: string, data): string {
		const model = FirestoreStorage.clone(data);
		if (!model.id) {
			return this.add(collection, model.data);
		}
		return this.update(collection, model.id, model.data);
	}

	private add(collection: string, data): string {
		const docRef = this.firestore.collection(collection).doc();
		return this.update(collection, docRef.id, data);
	}

	private update(collection: string, id: string, data): string {
		const path = FirestoreStorage.getPath(collection, id);
		const docRef = this.firestore.doc(path);
		try {
			docRef.set(data);
		} catch (error) {
			this.onFatalError.next(error);
			console.error('Caught Firebase error');
			throw error;
		}
		this.onWrite.next({path, data});
		return docRef.id;
	}

	batchSave(collection: string, data: any[], remove?: any[]): Observable<void> {
		const promise = this.firestore.runTransaction(async (trx) => {

			if (data) {
				for (const obj of data) {
					const clone = FirestoreStorage.clone(obj);
					if (clone.id) {
						const path = FirestoreStorage.getPath(collection, clone.id);
						await trx.update(this.firestore.doc(path), clone.data);
					} else {
						await trx.set(this.firestore.collection(collection).doc(), clone.data);
					}
				}
			}

			if (remove) {
				for (const obj of remove) {
					if (obj.id) {
						const path = FirestoreStorage.getPath(collection, obj.id);
						trx.delete(this.firestore.doc(path));
					} else {
						console.warn('Trying to delete object without id', obj);
					}
				}
			}

		});
		return observableFrom(promise);
	}

	query(collection: string, cb: (qb: Query) => Query) {
		const qb = this.firestore.collection(collection);
		const query = cb(qb);

		return this.observe(query);
	}

	delete(collection: string, id: string) {
		const qb = this.firestore.collection(collection);
		return observableFrom(qb.doc(id).delete());
	}
}
