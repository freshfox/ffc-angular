import {firestore} from 'firebase/app';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import Query = firestore.Query;
import CollectionReference = firestore.CollectionReference;
import {FirestoreSchemaModel} from './descorators';
import {FirestoreStorage} from './storage';

@Injectable()
export abstract class BaseRepository<T> {

	protected schemaModel: FirestoreSchemaModel | any = {};

	// Don't make protected unless you want to break Angular
	// noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
	constructor(private storage: FirestoreStorage) {
	}

	abstract getCollectionPath(...documentIds: string[]): string;

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

	delete(id: string, ...documentIds: string[]) {
		return this.storage.delete(this.getCollectionPath(...documentIds), id);
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
