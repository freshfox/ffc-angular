import {NgModule} from '@angular/core';
import {FirestoreStorage} from './storage';

export * from './base.model';
export * from './base.repo';
export * from './storage';

@NgModule({
	declarations: [],
	imports: [],
	providers: [
		FirestoreStorage,
	],
	exports: []
})
export class FFFirestoreModule {
}