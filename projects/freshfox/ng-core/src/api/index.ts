import {NgModule} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClientModule} from '@angular/common/http';

export * from './api.service';
export * from './service-error';

@NgModule({
	imports: [
		HttpClientModule,
	],
	exports: [],
	declarations: [],
	providers: [
		ApiService
	],
})
export class FFApiModule {
}
