import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FFButtonModule} from '../../../freshfox/ng-core/src/button';
import {FFSnackbarModule} from '../../../freshfox/ng-core/src/snackbar';
import {FFInputModule} from '../../../freshfox/ng-core/src/input';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FFButtonModule,
		FFSnackbarModule,
		FFInputModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
