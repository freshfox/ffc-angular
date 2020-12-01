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
import {
	FF_AUTH_UI_BACKGROUND_PATH,
	FF_AUTH_UI_LOGO_PATH,
	FF_AUTH_UI_TAGLINE,
	FFAuthUserInterfaceModule
} from '../../../freshfox/ng-auth/src/ui/auth-ui.module';
import {FFAuthModule} from '../../../freshfox/ng-auth/src/auth/auth.module';
import {AngularFireModule} from '@angular/fire';
import {FFInputModule} from '@freshfox/ng-core';
import {of} from 'rxjs';

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
		{provide: FF_AUTH_UI_TAGLINE, useValue: of('hello')},
		{provide: FF_AUTH_UI_BACKGROUND_PATH, useValue: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80'},
		{provide: FF_AUTH_UI_LOGO_PATH, useValue: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg'},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
