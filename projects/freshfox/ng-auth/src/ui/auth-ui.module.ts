import {InjectionToken, NgModule, Type} from '@angular/core';
import {PublicComponent} from './public.component';
import {LoginComponent} from './login.component';
import {CommonModule} from '@angular/common';
import {PasswordResetComponent} from './password-reset.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FFButtonModule, FFDialogModule, FFInputModule, FFSnackbarModule} from '@freshfox/ng-core';
import {MatCardModule} from '@angular/material/card';
import {FFAuthModule} from '../auth/auth.module';

export * from '../auth/auth.service';
export * from '../auth/internal.guard';
export * from './login.component';
export * from './password-reset.component';
export * from './public.component';
export * from '../auth/public.guard';

export const FF_AUTH_UI_SHOW_TAGLINE = new InjectionToken('FF_AUTH_UI_SHOW_TAGLINE');
export const FF_AUTH_UI_TERMS = new InjectionToken('FF_AUTH_UI_TERMS');

@NgModule({
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCardModule,
		TranslateModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		FFSnackbarModule,
		FFInputModule,
		FFButtonModule,
		FFAuthModule,
		FFDialogModule,
	],
	exports: [
		PublicComponent,
		LoginComponent,
		PasswordResetComponent,
	],
	declarations: [
		PublicComponent,
		LoginComponent,
		PasswordResetComponent,
	],
	providers: [
		{provide: FF_AUTH_UI_SHOW_TAGLINE, useValue: true},
		{provide: FF_AUTH_UI_TERMS, useValue: null },
	]
})
export class FFAuthUserInterfaceModule {
}
