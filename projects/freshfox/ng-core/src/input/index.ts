import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FFInputComponent} from './input.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FFFormControlValidationMessageModule} from '../validation-message/index';
import {FFFormFieldModule} from '../core/form-field.component';

export * from './input.component';

@NgModule({
	declarations: [FFInputComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		BrowserAnimationsModule,
		FFFormControlValidationMessageModule,
		FFFormFieldModule
	],
	exports: [FFInputComponent],
})
export class FFInputModule {
}
