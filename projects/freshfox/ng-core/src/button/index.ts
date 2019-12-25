import {NgModule} from '@angular/core';
import {ButtonComponent} from './button.component';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export * from './button.component';

@NgModule({
	imports: [CommonModule, MatProgressSpinnerModule, BrowserAnimationsModule],
	declarations: [ButtonComponent],
	exports: [ButtonComponent],
})
export class FFButtonModule {
}
