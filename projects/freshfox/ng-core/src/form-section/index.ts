import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FFCardModule} from '../card/index';
import {FormSectionComponent} from './form-section.component';

export * from './form-section.component';

@NgModule({
	imports: [CommonModule, FFCardModule],
	exports: [FormSectionComponent],
	declarations: [FormSectionComponent],
	providers: [],
})
export class FFFormSectionModule {
}
