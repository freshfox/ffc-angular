import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {of} from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {FF_AUTH_UI_BACKGROUND_PATH, FF_AUTH_UI_LOGO_PATH, FF_AUTH_UI_TAGLINE} from '../../../freshfox/ng-auth/src/ui/tokens';
import { FFButtonModule } from 'projects/freshfox/ng-core/src/button';
import { FFSnackbarModule } from 'projects/freshfox/ng-core/src/snackbar';
import {FFSelectModule} from '../../../freshfox/ng-core/src/select';
import {FFFormControlValidationMessageModule} from '../../../freshfox/ng-core/src/validation-message';
import {FFSidenavModule} from '../../../freshfox/ng-core/src/sidenav';
import {FFCardModule} from '../../../freshfox/ng-core/src/card';
import {FFFormSectionModule} from '../../../freshfox/ng-core/src/form-section';
import {FFBadgeModule} from '../../../freshfox/ng-core/src/badge';
import {FFDialogModule} from '../../../freshfox/ng-core/src/dialog';
import {FFAuthUserInterfaceModule} from '../../../freshfox/ng-auth/src/ui/auth-ui.module';
import firebase from 'firebase/app';

firebase.initializeApp({
	apiKey: "AIzaSyBlIKr_AXCZ2qqUypPiE8CseomyyxI3W90",
	authDomain: "tablechamp-develop.firebaseapp.com",
	projectId: "tablechamp-develop",
	storageBucket: "tablechamp-develop.appspot.com",
	messagingSenderId: "515161195573",
	appId: "1:515161195573:web:fbfa1a9f99437f536e5d7c"
});

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
		RouterModule.forRoot([], {relativeLinkResolution: 'legacy'}),
		FFSidenavModule,
		FFButtonModule,
		FFSnackbarModule,
		FFSelectModule,
		FFCardModule,
		FFFormSectionModule,
		FFBadgeModule,
		FFDialogModule,
		FFAuthUserInterfaceModule,
		FFFormControlValidationMessageModule.forRoot()
	],
	providers: [
		// {provide: FF_AUTH_UI_TAGLINE, useValue: of('Einloggen')},
		{
			provide: FF_AUTH_UI_BACKGROUND_PATH,
			useValue: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80'
		},
		{provide: FF_AUTH_UI_LOGO_PATH, useValue: 'assets/images/logo.svg'},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
