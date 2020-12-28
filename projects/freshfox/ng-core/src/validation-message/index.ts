import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {FakeInputValidationMessageProvider, InputValidationMessageProvider} from './validation-message-provider';

export * from './validation-message-provider';

@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [
		{
			provide: InputValidationMessageProvider,
			useClass: FakeInputValidationMessageProvider
		},
	],
})
export class FFFormControlValidationMessageModule {
	static forRoot(config: FFFormControlValidationMessageModuleConfig = {}): ModuleWithProviders<FFFormControlValidationMessageModule> {
		return {
			ngModule: FFFormControlValidationMessageModule,
			providers: [
				config.validationMessageProvider || {
					provide: InputValidationMessageProvider,
					useClass: FakeInputValidationMessageProvider
				},
			]
		};
	}
}

export interface FFFormControlValidationMessageModuleConfig {
	validationMessageProvider?: Provider;
}

