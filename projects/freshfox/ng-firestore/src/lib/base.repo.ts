import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {FirestoreStorage} from './storage';
import {CollectionReference, Query} from '@angular/fire/firestore';
import {BaseModel} from './base.model';

@Injectable()
export abstract class BaseRepository<T extends BaseModel> {

	constructor(private storage: FirestoreStorage) {
	}

	abstract getCollectionPath(...documentIds: string[]): string;

	generateId() {
		return this.storage.generateId();
	}

	findById(id: string): Observable<T> {
		return this.storage.findById(this.getCollectionPath(), id);
	}

	list(where?: T, order?: Order<T>): Observable<T[]> {
		return this.query((query) => {
			query = this.mapToWhereClause(query, where);
			if (order) {
				query = query.orderBy(order.property as string, order.direction);
			}
			return query;
		});
	}

	protected mapToWhereClause(query: Query, attributes?: T): Query {
		if (!attributes) {
			return query;
		}
		return Object.keys(attributes)
			.reduce((query, key) => {
				return query.where(key, '==', attributes[key]);
			}, query);
	}

	query(queryCallback: (query: Query | CollectionReference) => Query | CollectionReference) {
		return this.storage.query(this.getCollectionPath(), queryCallback);
	}

	save(data: T): string {
		return this.storage.save(this.getCollectionPath(), data);
	}

	batchSave(data: T[], remove?: T[]): Observable<void> {
		return this.storage.batchSave(this.getCollectionPath(), data, remove);
	}

	delete(id: string) {
		return this.storage.delete(this.getCollectionPath(), id);
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
