import {ChangeDetectionStrategy, Component, HostBinding, Inject, Input} from '@angular/core';
import {FF_AUTH_UI_LOGO_PATH, FF_AUTH_UI_SHOW_TAGLINE} from './tokens';

@Component({
	selector: 'ff-public',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="ff-auth__wrapper">
			<img class="ff-auth__background" src="assets/images/login/bg.jpg">

			<div class="ff-auth__inner">
				<div class="ff-auth__content-wrapper">
					<div class="ff-auth__header">
						<img [src]="logoPath" class="ff-auth__logo">
						<p class="ff-auth__tagline" *ngIf="showTagline">{{ 'login.tagline' | translate }}</p>
					</div>
					<div class="ff-auth__content">
						<router-outlet *ngIf="routerMode"></router-outlet>
						<ng-content></ng-content>
					</div>
				</div>
			</div>
		</div>
	`
})
export class PublicComponent {

	@Input() routerMode = true;

	@HostBinding('class') clazz = 'ff-public';

	constructor(@Inject(FF_AUTH_UI_SHOW_TAGLINE) public showTagline: boolean, @Inject(FF_AUTH_UI_LOGO_PATH) public logoPath: string) {
	}

}
