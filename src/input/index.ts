import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FakeValidationMessageProvider, ValidationMessageProvider} from './validation-message-provider';
import {ControlMessagesComponent} from './control-messages.component';
import {DecimalDirective} from './input-decimal.directive';
import {DatePickerDirective} from '../datepicker/input-date.directive';

export * from './input.component';
export * from './control-messages.component';
export * from './validation-message-provider';

export interface FFInputModuleConfig {
	validationMessageProvider?: Provider;
}

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [InputComponent, ControlMessagesComponent, DecimalDirective],
	exports: [InputComponent, ControlMessagesComponent, DecimalDirective],
})
export class FFInputModule {
	static forRoot(config: FFInputModuleConfig = {}): ModuleWithProviders {
		return {
			ngModule: FFInputModule,
			providers: [
				config.validationMessageProvider || {
					provide: ValidationMessageProvider,
					useClass: FakeValidationMessageProvider
				},
			]
		};
	}
}