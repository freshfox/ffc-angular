import {NgModule} from '@angular/core';
import {ButtonComponent} from './button.component';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FFIconModule} from '../icon/index';

export * from './button.component';

@NgModule({
	imports: [CommonModule, MatProgressSpinnerModule, FFIconModule],
	declarations: [ButtonComponent],
	exports: [ButtonComponent],
})
export class FFButtonModule {
}
