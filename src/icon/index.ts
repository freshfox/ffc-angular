import {NgModule} from '@angular/core';
import {IconComponent} from './icon.component';
import {CommonModule} from '@angular/common';

export * from './icon.component';

@NgModule({
	imports: [CommonModule],
	declarations: [IconComponent],
	exports: [IconComponent],
})
export class FFIconModule {
}