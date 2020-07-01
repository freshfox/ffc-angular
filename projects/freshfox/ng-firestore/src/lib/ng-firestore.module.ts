import {ModuleWithProviders, NgModule} from '@angular/core';
import {FIRESTORE_STORAGE_CONFIG, FirestoreStorage, FirestoreStorageConfig} from './storage';

export * from './base.model';
export * from './base.repo';
export * from './storage';
export * from './decorators';

@NgModule({
	declarations: [],
	imports: [],
	providers: [
		FirestoreStorage,
	],
	exports: []
})
export class FFFirestoreModule {
	static forRoot(config: FirestoreStorageConfig): ModuleWithProviders<FFFirestoreModule> {
		return {
			ngModule: FFFirestoreModule,
			providers: [{
				provide: FIRESTORE_STORAGE_CONFIG,
				useValue: config
			}]
		};
	}
}
