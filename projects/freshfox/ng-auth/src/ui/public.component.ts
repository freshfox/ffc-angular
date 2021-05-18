import {ChangeDetectionStrategy, Component, HostBinding, Inject, Input} from '@angular/core';
import {FF_AUTH_UI_BACKGROUND_PATH, FF_AUTH_UI_LOGO_PATH, FF_AUTH_UI_TAGLINE} from './tokens';
import {Observable} from 'rxjs';

@Component({
	selector: 'ff-public',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<img class="fixed inset-0 w-screen h-screen object-cover ff-public__background" [src]="backgroundPath" alt="Background">

		<div class="w-full relative">
			<div>
				<ng-content select="[ffPublicTop]"></ng-content>
				<img class="mx-auto h-auto w-[var(--ff-auth-logo-size)]" [src]="logoPath" alt="Logo">
				<div class="mb-12 mt-4">
					<div>
						<h2 class="text-center text-2xl xl:text-3xl font-medium text-white" *ngIf="tagline$ | async as tagline">
							{{ tagline }}
						</h2>
					</div>
				</div>
			</div>
			<router-outlet *ngIf="routerMode"></router-outlet>
			<ng-content></ng-content>
		</div>
	`
})
export class PublicComponent {

	@Input() routerMode = true;

	@HostBinding('class') clazz = 'ff-public min-h-screen flex justify-center bg-gray-900 dark:bg-gray-900 py-12 pt-16 sm:pt-24 md:pt-32 px-4 sm:px-6 lg:px-8 relative';

	constructor(@Inject(FF_AUTH_UI_TAGLINE) public tagline$: Observable<string>,
				@Inject(FF_AUTH_UI_BACKGROUND_PATH) public backgroundPath: string,
				@Inject(FF_AUTH_UI_LOGO_PATH) public logoPath: string) {
	}

}
