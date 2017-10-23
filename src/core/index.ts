import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FakeValidationMessageProvider, ValidationMessageProvider} from './validation-message-provider';

export * from './helpers';
export * from './form-helpers';
export * from './translate-packaged-loader';
export * from './validation-message-provider';
export * from './form-validator';

export interface FFCoreModuleConfig {
	validationMessageProvider?: Provider;
}

@NgModule({
	imports: [BrowserModule],
})
export class FFCoreModule {

	static forRoot(config: FFCoreModuleConfig = {}): ModuleWithProviders {
		return {
			ngModule: FFCoreModule,
			providers: [
				config.validationMessageProvider || {
					provide: ValidationMessageProvider,
					useClass: FakeValidationMessageProvider
				},
			]
		};
	}
}