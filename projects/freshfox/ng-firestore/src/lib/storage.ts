import {from as observableFrom, Observable, Subject} from 'rxjs';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {map} from 'rxjs/operators';
import debugFunc from 'debug';
import Firestore = firebase.firestore.Firestore;
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import CollectionReference = firebase.firestore.CollectionReference;
import Query = firebase.firestore.Query;
import {SchemaDescription} from './decorators';

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

	private static readonly debugLog = debugFunc('firestore');

	public firestore: Firestore;
	public onMultiTabError = new Subject();

	readonly onFatalError = new Subject<any>();
	readonly onWrite = new Subject<{ path: string, data: any }>();

	private static clone(schema: SchemaDescription, data): { id: string, data } {
		const clone = Object.assign({}, data);

		Object.keys(clone).forEach((key) => {
			let value = clone[key];

			if (schema) {
				const propertyDesc = schema[key];
				if (propertyDesc && propertyDesc.serializer) {
					value = propertyDesc.serializer(value);
				}
			}

			if (value === undefined) {
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

	private static format(snapshot: DocumentSnapshot, schema: SchemaDescription) {
		if (!snapshot.exists) {
			return null;
		}

		const clone = Object.assign({
			id: snapshot.id
		}, snapshot.data());

		if (schema) {
			Object.keys(clone).forEach((key) => {
				const propertyDesc = schema[key];
				if (propertyDesc && propertyDesc.deserializer) {
					clone[key] = propertyDesc.deserializer(clone[key]);
				}
			});
		}

		return clone;
	}

	private static logTiming(diff: number, message: string, resultsCount?: number) {
		let str = `Query [${diff}ms] ${message}`;
		if (resultsCount) {
			str += ` (${resultsCount})`;
		}
		this.debugLog(str);
	}

	constructor(@Inject(FIRESTORE_STORAGE_CONFIG) private config: FirestoreStorageConfig) {
		this.initFireStore();
	}

	private initFireStore() {
		this.firestore = firebase.app().firestore();

		const settings: firebase.firestore.Settings = {
			cacheSizeBytes: 60000000,
		};

		if (this.config.disableTimestamps) {
			settings.timestampsInSnapshots = false;
		}

		this.firestore.settings(settings);

		if (this.config.persistenceEnabled) {
			this.firestore.enablePersistence()
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

	private observe(query: CollectionReference | DocumentReference | Query | any, schema: SchemaDescription) {

		const start = Date.now();
		let logged = false;

		const successCallback = (snapshot) => {

			if (!logged) {
				const deltaMs = Date.now() - start;
				logged = true;
				if (query instanceof CollectionReference) {
					FirestoreStorage.logTiming(deltaMs, `Col ${query.path}`, snapshot.size);
				} else if (query instanceof DocumentReference) {
					FirestoreStorage.logTiming(deltaMs, `Doc ${query.path}`);
				} else {
					const q = query['_query'];
					const path = q.path.segments.join('/');
					const queryStr = q.filters.map((current) => {
						const field = current.field.segments.join('/');
						const op = current.op.name;
						const value = current.value.internalValue;

						return `${field} ${op} ${value}`;
					}).join(' && ');
					FirestoreStorage.logTiming(deltaMs, `${path} ${queryStr}`, snapshot.size);
				}
			}

			return snapshot.docs
				? snapshot.docs.map((doc => FirestoreStorage.format(doc, schema)))
				: FirestoreStorage.format(snapshot, schema);
		};

		return new Observable<any>((observer) => {
			// return tear down logic
			return query.onSnapshot((snapshot) => {
				const data = successCallback(snapshot);
				observer.next(data);
			}, (error) => {
				console.error(error);
				console.error(query);
				observer.error(error);
				this.onFatalError.next(error);
			}, observer.complete);

			/*return query.get()
				.then((snapshot) => {
					const data  = successCallback(snapshot);
					observer.next(data);
					observer.complete();
				}, observer.error);*/

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

	findById(collection: string, id: string, schema: SchemaDescription) {
		const path = FirestoreStorage.getPath(collection, id);
		const docRef = this.firestore.doc(path);
		return this.observe(docRef, schema);
	}

	find(collection: string, cb: (qb: Query) => Query, schema: SchemaDescription) {
		return this.query(collection, (qb) => {
			return cb(qb).limit(1);
		}, schema).pipe(map((result) => {
			return result[0] || null;
		}));
	}

	save(schema: SchemaDescription, collection: string, data): string {
		const model = FirestoreStorage.clone(schema, data);
		FirestoreStorage.debugLog('Saving', collection, model.id, model.data);
		if (!model.id) {
			const id = this.add(collection, model.data);
			data.id = id;
			return id;
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
			docRef.set(data, { merge: true });
		} catch (error) {
			this.onFatalError.next(error);
			console.error('Caught Firebase error');
			throw error;
		}
		this.onWrite.next({path, data});
		return docRef.id;
	}

	batchSave(schema: SchemaDescription, collection: string, data: any[], remove?: any[]): Observable<void> {
		const promise = this.firestore.runTransaction(async (trx) => {

			if (data) {
				FirestoreStorage.debugLog('Batch-saving', collection, data);
				for (const obj of data) {
					const clone = FirestoreStorage.clone(schema, obj);
					if (clone.id) {
						const path = FirestoreStorage.getPath(collection, clone.id);
						await trx.set(this.firestore.doc(path), clone.data, {merge: true});
					} else {
						const docRef = this.firestore.collection(collection).doc();
						await trx.set(docRef, clone.data, {merge: true});
						obj.id = docRef.id;
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

	query(collection: string, cb: (qb: Query) => Query, schema: SchemaDescription) {
		const qb = this.firestore.collection(collection);
		const query = cb(qb);

		return this.observe(query, schema);
	}

	delete(collection: string, id: string) {
		const qb = this.firestore.collection(collection);
		return observableFrom(qb.doc(id).delete());
	}
}
