import {NgModule} from '@angular/core';
import {BadgeComponent} from './badge.component';

export * from './badge.component';

@NgModule({
	imports: [],
	exports: [BadgeComponent],
	declarations: [BadgeComponent],
	providers: [],
})
export class FFBadgeModule {
}
