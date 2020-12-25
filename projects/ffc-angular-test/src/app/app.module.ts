import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
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
import {FFSelectModule} from '../../../freshfox/ng-core/src/select';
import {FFFormControlValidationMessageModule, InputValidationMessageProvider} from '../../../freshfox/ng-core/src/validation-message';
import {MatCardModule} from '@angular/material/card';
import {ValidationProvider} from './validation-provider';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		TranslateModule.forRoot(),
		ReactiveFormsModule,
		MatSidenavModule,
		MatCardModule,
		RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
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
		FFInputModule,
		FFSelectModule,
		FFFormControlValidationMessageModule.forRoot({
			validationMessageProvider: 	{
				provide: InputValidationMessageProvider,
				useClass: ValidationProvider,
			}
		})
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
