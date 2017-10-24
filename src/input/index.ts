import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FFCoreModule} from '../core/index';

export * from './input.component';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, FFCoreModule],
	declarations: [InputComponent],
	exports: [InputComponent],
})
export class FFInputModule {
}