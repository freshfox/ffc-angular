import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent, TermsComponent} from './app.component';
import {FFButtonModule} from '../../../freshfox/ng-core/src/button';
import {FFSnackbarModule} from '../../../freshfox/ng-core/src/snackbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FFSidenavModule} from '../../../freshfox/ng-core/src/sidenav';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {FF_AUTH_UI_SHOW_TAGLINE, FF_AUTH_UI_TERMS, FFAuthUserInterfaceModule} from '../../../freshfox/ng-auth/src/ui/auth-ui.module';
import {FFAuthModule} from '../../../freshfox/ng-auth/src/auth/auth.module';
import {AngularFireModule} from '@angular/fire';
import {FFInputModule} from '@freshfox/ng-core';

@NgModule({
	declarations: [
		AppComponent,
		TermsComponent,
	],
	entryComponents: [
		TermsComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		TranslateModule.forRoot(),
		ReactiveFormsModule,
		MatSidenavModule,
		RouterModule.forRoot([]),
		AngularFireModule.initializeApp({
			apiKey: '***REMOVED***',
			authDomain: '***REMOVED***',
			databaseURL: '***REMOVED***',
			projectId: '***REMOVED***',
			storageBucket: '***REMOVED***.appspot.com',
			messagingSenderId: '***REMOVED***'
		}),
		FFAuthUserInterfaceModule,
		FFAuthModule,
		FFSidenavModule,
		FFButtonModule,
		FFSnackbarModule,
		FFInputModule.forRoot(),
	],
	providers: [
		{provide: FF_AUTH_UI_SHOW_TAGLINE, useValue: false},
		{provide: FF_AUTH_UI_TERMS, useValue: { component: TermsComponent }},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
