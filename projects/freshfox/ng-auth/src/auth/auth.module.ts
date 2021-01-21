import {NgModule} from '@angular/core';
import {PublicGuard} from './public.guard';
import {InternalGuard} from './internal.guard';
import {AuthService} from './auth.service';

export * from './auth.service';
export * from './internal.guard';
export * from './public.guard';
export * from './api-token.interceptor';

@NgModule({
	imports: [],
	providers: [
		PublicGuard,
		InternalGuard,
		AuthService,
	],
})
export class FFAuthModule {
}
