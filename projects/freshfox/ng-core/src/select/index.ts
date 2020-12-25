import {NgModule} from '@angular/core';
import {FFOptionComponent, FFSelectComponent} from './select.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FFFormControlValidationMessageModule} from '../validation-message/index';
import {FFFormFieldModule} from '../core/form-field.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatSelectModule,
		FFFormControlValidationMessageModule,
		FFFormFieldModule,
	],
	exports: [
		FFSelectComponent,
		FFOptionComponent,
		MatSelectModule
	],
	declarations: [
		FFSelectComponent,
		FFOptionComponent
	],
	providers: [],
})
export class FFSelectModule {
}
