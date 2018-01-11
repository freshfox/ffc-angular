import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {DatePickerDirective} from './input-date.directive';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [DatePickerDirective],
	exports: [DatePickerDirective],
})
export class FFDatePickerModule {
}