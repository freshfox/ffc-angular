import {NgModule} from '@angular/core';
import {PublicGuard} from './public.guard';
import {InternalGuard} from './internal.guard';
import {PublicComponent} from './public.component';
import {LoginComponent} from './login.component';
import {CommonModule} from '@angular/common';
import {PasswordResetComponent} from './password-reset.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FFSnackbarModule, FFInputModule} from '@freshfox/ng-core';
import {MatCardModule} from '@angular/material/card';
import {AuthService} from './auth.service';

export * from './auth.service';
export * from './internal.guard';
export * from './login.component';
export * from './password-reset.component';
export * from './public.component';
export * from './public.guard';

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
		AngularFireAuthModule,
		FFSnackbarModule,
		FFInputModule,
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
		PublicGuard,
		InternalGuard,
		AuthService,
	],
})
export class FFAuthModule {
}
