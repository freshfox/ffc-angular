import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownComponent} from './dropdown.component';
import {FFIconModule} from '../icon/index';

export * from './dropdown.component';

@NgModule({
	imports: [CommonModule, FFIconModule],
	declarations: [DropdownComponent],
	exports: [DropdownComponent],
})
export class FFDropdownModule {
}