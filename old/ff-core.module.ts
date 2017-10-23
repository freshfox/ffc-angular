import {Injectable, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IconComponent} from '../src/icon/icon.component';
import {ButtonComponent} from './components/button.component';
import {SpinnerComponent} from '../src/spinner/spinner.component';
import {ConfirmComponent} from './components/confirm.component';
import {ControlMessagesComponent} from '../src/core/control-messages.component';
import {InputComponent} from '../src/input/input.component';
import {SelectComponent} from '../src/select/select.component';
import {DatePickerDirective} from './directives/input-date.directive';
import {MaterialModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {DecimalDirective} from './directives/input-decimal.directive';
import {NumberPipe} from './pipes/number.pipe';
import {SafePipe} from './pipes/safe.pipe';
import {ModalPlaceholderComponent, ModalService} from './services/modal.service';
import {Formatter} from './formatter';
import {AlertBarComponent} from '../src/alert-bar/alert-bar.component';
import {DropdownComponent} from '../src/dropdown/dropdown.component';
import {TableComponent} from '../src/table/table.component';
import {TableHeaderCellComponent} from '../src/table/table-header-cell.component';
import {FakeValidationMessageProvider, ValidationMessageProvider} from '../src/core/validation-message-provider';
import {NotificationService} from '../src/snackbar/notification.service';

export * from './components/button.component';
export * from './components/confirm.component';
export * from '../src/core/control-messages.component';
export * from '../src/icon/icon.component';
export * from '../src/icon/icon.component';
export * from '../src/input/input.component';
export * from './components/material.module';
export * from '../src/select/select.component';
export * from '../src/spinner/spinner.component';

export * from './services/modal.service';
export * from './directives/input-date.directive';

export {NumberPipe} from './pipes/number.pipe';

export * from '../src/core/translate-packaged-loader';

export interface FFCoreModuleConfig {
	validationMessageProvider?: Provider;
}


@NgModule({
	imports: [BrowserModule, MaterialModule, FormsModule],
	declarations: [
		IconComponent,
		ButtonComponent,
		SpinnerComponent,
		ConfirmComponent,
		ControlMessagesComponent,
		InputComponent,
		SelectComponent,
		ModalPlaceholderComponent,
		DatePickerDirective,
		DecimalDirective,
		NumberPipe,
		SafePipe,
		AlertBarComponent,
		DropdownComponent,
		TableComponent,
		TableHeaderCellComponent
	],
	exports: [
		IconComponent,
		ButtonComponent,
		SpinnerComponent,
		ConfirmComponent,
		ControlMessagesComponent,
		InputComponent,
		SelectComponent,
		ModalPlaceholderComponent,
		NumberPipe,
		SafePipe,
		AlertBarComponent,
		DropdownComponent,
		TableComponent
	],
	entryComponents: [
		ConfirmComponent
	],
	providers: [
		ModalService,
		NumberPipe,
		SafePipe,
		Formatter,
		NotificationService
	]
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
