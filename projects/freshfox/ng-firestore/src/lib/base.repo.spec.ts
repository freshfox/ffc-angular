import {TestBed} from '@angular/core/testing';
import {BaseRepository, FFFirestoreModule} from './ng-firestore.module';
import {RestaurantRepository} from '../tests/restaurant.repo';
import {wait} from '../tests/utils';
import {first} from 'rxjs/operators';

describe('BaseRepository', () => {

	let restaurantRepo: RestaurantRepository;

	beforeAll(() => {
		TestBed.configureTestingModule({
			imports: [FFFirestoreModule.forRoot({
				firebase: {
					apiKey: 'AIzaSyDin4wGlWGfG8vD8PjbrwmSNcUhz85yB0o',
					authDomain: 'firestore-storage-test.firebaseapp.com',
					databaseURL: 'https://firestore-storage-test.firebaseio.com',
					projectId: 'firestore-storage-test',
					storageBucket: 'firestore-storage-test.appspot.com',
					messagingSenderId: '540928736740',
					appId: '1:540928736740:web:d5a665fbbbb828ae8f5bf1'
				}
			})],
			providers: [
				RestaurantRepository
			]
		});
		restaurantRepo = TestBed.inject(RestaurantRepository);
	});

	it('should save data using a transaction', async () => {

		const rId1 = restaurantRepo.save({
			name: 'R1'
		});

		await wait(1000);

		const result = await restaurantRepo.transaction(async (trx) => {
			const restaurant = await trx.get(rId1);
			restaurant.name = 'R2';
			trx.set(restaurant);
			return 'done';
		});

		expect(result).toEqual('done');

		const restaurants = await restaurantRepo.list().pipe(first()).toPromise();

		console.log(restaurants);
		expect(restaurants.length).toEqual(1);
		expect(restaurants[0].id).toEqual(rId1);
		expect(restaurants[0].name).toEqual('R2');
	});

});
