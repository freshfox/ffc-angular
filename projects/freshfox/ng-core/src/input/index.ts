import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FFInputComponent} from './input.component';
import {FakeInputValidationMessageProvider, InputValidationMessageProvider} from './validation-message-provider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export * from './input.component';
export * from './validation-message-provider';

@NgModule({
	declarations: [FFInputComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
	exports: [FFInputComponent],
})
export class FFInputModule {
	static forRoot(config: FFInputModuleConfig = {}): ModuleWithProviders {
		return {
			ngModule: FFInputModule,
			providers: [
				config.validationMessageProvider || {
					provide: InputValidationMessageProvider,
					useClass: FakeInputValidationMessageProvider
				},
			]
		};
	}
}

export interface FFInputModuleConfig {
	validationMessageProvider?: Provider;
}
