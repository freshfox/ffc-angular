import {NgModule} from '@angular/core';
import {CardComponent} from './card.component';
import {CommonModule} from '@angular/common';

export * from './card.component';

@NgModule({
	imports: [CommonModule],
	exports: [CardComponent],
	declarations: [CardComponent],
	providers: [],
})
export class FFCardModule {
}
