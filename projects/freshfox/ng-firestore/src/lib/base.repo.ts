import {firestore} from 'firebase/app';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import Query = firestore.Query;
import CollectionReference = firestore.CollectionReference;
import Transaction = firestore.Transaction;
import {FirestoreStorage} from './storage';
import {FirestoreSchemaModel} from './decorators';

@Injectable()
export abstract class BaseRepository<T> {

	protected schemaModel: FirestoreSchemaModel | any = {};

	// Don't make protected unless you want to break Angular
	// noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
	constructor(private storage: FirestoreStorage) {
	}

	abstract getCollectionPath(...documentIds: string[]): string;

	getCollectionId(): string {
		throw Error('Please implement the getCollectionId method to use group queries');
	}

	generateId() {
		return this.storage.generateId();
	}

	findById(...documentIds: string[]): Observable<T> {
		const docId = documentIds.pop();
		return this.storage.findById(this.getCollectionPath(...documentIds), docId, this.schemaModel.__schema);
	}

	list(where?: T, order?: Order<T>, ...documentIds: string[]): Observable<T[]> {
		return this.query((query) => {
			query = this.mapToWhereClause(query, where);
			if (order) {
				query = query.orderBy(order.property as string, order.direction);
			}
			return query;
		}, ...documentIds);
	}

	collectionGroup(): Observable<T[]> {
		return this.storage.collectionGroup(this.getCollectionId());
	}

	protected mapToWhereClause(query: Query, attributes?: T): Query {
		if (!attributes) {
			return query;
		}
		return Object.keys(attributes)
			.reduce((queryBuilder, key) => {
				return queryBuilder.where(key, '==', attributes[key]);
			}, query);
	}

	query(queryCallback: (query: Query | CollectionReference) => Query | CollectionReference, ...documentIds: string[]) {
		return this.storage.query(this.getCollectionPath(...documentIds), queryCallback, this.schemaModel.__schema);
	}

	save(data: T, ...documentIds: string[]): string {
		return this.storage.save(this.schemaModel.__schema, this.getCollectionPath(...documentIds), data);
	}

	batchSave(data: T[], remove?: T[], ...documentIds: string[]): Observable<void> {
		return this.storage.batchSave(this.schemaModel.__schema, this.getCollectionPath(...documentIds), data, remove);
	}

	delete(...documentIds: string[]) {
		const id = documentIds.pop();
		return this.storage.delete(this.getCollectionPath(...documentIds), id);
	}

	transaction(updateFunction: (trx: RepositoryTransaction<T>) => Promise<any>, ...documentIds: string[]) {
		return this.storage.transaction((trx) => {
			return updateFunction(new RepositoryTransaction<T>(
				this.getCollectionPath(...documentIds), this.storage, trx
			));
		});
	}
}

export interface Order<T> {
	property: keyof T;
	direction: OrderDirection;
}

export enum OrderDirection {
	Asc = 'asc',
	Desc = 'desc'
}

class RepositoryTransaction<T> {

	constructor(private collectionPath: string, private storage: FirestoreStorage, private trx: Transaction) {
	}

	create(data: T): Transaction {
		const model = FirestoreStorage.clone(null, data);
		return this.trx.set(null, model.data);
	}

	set(data: T): Transaction {
		const model = FirestoreStorage.clone(null, data);
		return this.trx.set(this.doc(model.id), model.data, {
			merge: true
		});
	}

	setAvoidMerge(data: T): Transaction {
		const model = FirestoreStorage.clone(null, data);
		return this.trx.set(this.doc(model.id), model.data);
	}

	delete(docId: string): Transaction {
		return this.trx.delete(this.doc(docId));
	}

	get(docId: string): Promise<T> {
		return this.trx.get(this.doc(docId))
			.then((snapshot) => {
				return FirestoreStorage.format(snapshot, null) as any; // Why any?
			});
	}

	private doc(path?: string) {
		if (path) {
			return this.storage.collection(this.collectionPath).doc(path);
		}
		return this.storage.collection(this.collectionPath).doc();
	}

}
