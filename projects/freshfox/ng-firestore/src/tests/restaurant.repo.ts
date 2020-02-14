import {BaseRepository} from '../lib/base.repo';
import {BaseModel} from '../lib/base.model';
import {getFirestoreTestPath} from './utils';

export interface Restaurant extends BaseModel {
	name?: string;
}

export class RestaurantRepository extends BaseRepository<Restaurant> {
	getCollectionPath(...documentIds: string[]): string {
		return getFirestoreTestPath('restaurants');
	}
}
