import {NgModule} from '@angular/core';
import {PublicComponent} from './public.component';
import {LoginComponent} from './login.component';
import {CommonModule} from '@angular/common';
import {PasswordResetComponent} from './password-reset.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {FFAlertBarModule, FFButtonModule, FFInputModule, FFSnackbarModule} from '@freshfox/ng-core';
import {MatCardModule} from '@angular/material/card';
import {FFAuthModule} from '../auth/auth.module';
import {FF_AUTH_UI_BACKGROUND_PATH, FF_AUTH_UI_LOGO_PATH, FF_AUTH_UI_TAGLINE} from './tokens';
import {PasswordResetConfirmComponent} from './password-reset-confirm.component';

export * from '../auth/auth.service';
export * from '../auth/internal.guard';
export * from './login.component';
export * from './password-reset.component';
export * from './password-reset-confirm.component';
export * from './public.component';
export * from '../auth/public.guard';
export * from './tokens';

@NgModule({
	imports: [
		CommonModule,
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
		FFAlertBarModule,
	],
	exports: [
		PublicComponent,
		LoginComponent,
		PasswordResetComponent,
		PasswordResetConfirmComponent,
	],
	declarations: [
		PublicComponent,
		LoginComponent,
		PasswordResetComponent,
		PasswordResetConfirmComponent,
	],
	providers: [
		{provide: FF_AUTH_UI_TAGLINE, useValue: null},
		{provide: FF_AUTH_UI_LOGO_PATH, useValue: 'assets/images/login/logo.svg'},
		{provide: FF_AUTH_UI_BACKGROUND_PATH, useValue: 'assets/images/login/bg.jpg'},
	]
})
export class FFAuthUserInterfaceModule {
}
