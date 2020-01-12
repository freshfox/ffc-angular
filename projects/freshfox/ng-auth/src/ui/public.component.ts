import {Component, HostBinding} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
	selector: 'ff-public',
	template: `
		<div class="ff-auth__wrapper">
			<img class="ff-auth__background" [@fadeIn] src="assets/images/login/bg.jpg">

			<div class="ff-auth__inner">
				<div class="ff-auth__content-wrapper">
					<div class="ff-auth__header">
						<img src="assets/images/login/logo.svg" class="ff-auth__logo">
						<p class="ff-auth__tagline">{{ 'login.tagline' | translate }}</p>
					</div>
					<div class="ff-auth__content">
						<router-outlet></router-outlet>
						<ng-content></ng-content>
					</div>
				</div>
			</div>
		</div>
	`,
	animations: [
		trigger('fadeIn', [
			transition('void => *', [
				style({opacity: 0}),
				animate('0.2s .5s ease-out')
			])
		])
	]
})
export class PublicComponent {

	@HostBinding('class') clazz = 'ff-public';

}
