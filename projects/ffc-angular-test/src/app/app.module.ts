import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FFButtonModule} from '../../../freshfox/ng-core/src/button';
import {FFSnackbarModule} from '../../../freshfox/ng-core/src/snackbar';
import {FFInputModule} from '../../../freshfox/ng-core/src/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FFSidenavModule} from '../../../freshfox/ng-core/src/sidenav';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		TranslateModule.forRoot(),
		ReactiveFormsModule,
		MatSidenavModule,
		RouterModule.forRoot([]),
		FFSidenavModule,
		FFButtonModule,
		FFSnackbarModule,
		FFInputModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
