import {Component} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
	selector: 'ff-public',
	template: `
		<div class="login-wrapper">
			<img class="login-background" [@fadeIn] src="assets/images/login/bg.jpg">

			<div class="login-inner">
				<div class="content-wrapper">
					<div class="header">
						<img src="assets/images/login/logo.svg" class="logo">
						<p class="sub">{{ 'login.tagline' | translate }}</p>
					</div>
					<div class="content">
						<router-outlet></router-outlet>
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
}
