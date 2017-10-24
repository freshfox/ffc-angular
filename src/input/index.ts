import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export * from './input.component';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	declarations: [InputComponent],
	exports: [InputComponent],
})
export class FFInputModule {
}