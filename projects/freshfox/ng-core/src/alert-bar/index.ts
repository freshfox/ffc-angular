import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertBarComponent} from './alert-bar.component';

export * from './alert-bar.component';

@NgModule({
	imports: [CommonModule],
	declarations: [AlertBarComponent],
	exports: [AlertBarComponent],
})
export class FFAlertBarModule {
}
