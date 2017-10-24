import {NgModule} from '@angular/core';
import {ButtonComponent} from './button.component';
import {CommonModule} from '@angular/common';
import {FFIconModule} from '../icon/index';

export * from './button.component';

@NgModule({
	imports: [CommonModule, FFIconModule],
	declarations: [ButtonComponent],
	exports: [ButtonComponent],
})
export class FFButtonModule {
}