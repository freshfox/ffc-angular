import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FFInputModule} from '../../../freshfox/ng-core/src/input';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FFInputModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
