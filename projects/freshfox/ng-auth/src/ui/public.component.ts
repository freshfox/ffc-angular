import {ChangeDetectionStrategy, Component, HostBinding, Inject, Input} from '@angular/core';
import {FF_AUTH_UI_BACKGROUND_PATH, FF_AUTH_UI_LOGO_PATH, FF_AUTH_UI_TAGLINE} from './tokens';
import {Observable} from 'rxjs';

@Component({
	selector: 'ff-public',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="ff-auth__wrapper">
			<img class="ff-auth__background" [src]="backgroundPath" alt="Background">

			<div class="ff-auth__inner">
				<div class="ff-auth__content-wrapper">
					<div class="ff-auth__header">
						<img [src]="logoPath" class="ff-auth__logo" alt="Logo">
						<p class="ff-auth__tagline" *ngIf="tagline$ | async">{{ tagline$ | async }}</p>
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

	constructor(@Inject(FF_AUTH_UI_TAGLINE) public tagline$: Observable<string>,
				@Inject(FF_AUTH_UI_BACKGROUND_PATH) public backgroundPath: string,
				@Inject(FF_AUTH_UI_LOGO_PATH) public logoPath: string) {
	}

}
