import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
	selector: 'ff-form-section',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div>
			<div class="md:grid md:grid-cols-3 md:gap-6">
				<div class="md:col-span-1">
					<h3 class="text-lg font-medium leading-6 text-gray-900">{{ title }}</h3>
					<p class="mt-1 text-sm text-gray-500">
						{{ subtitle }}
					</p>
				</div>
				<div class="mt-5 md:mt-0 md:col-span-2">
					<ff-card [padding]="padding" *ngIf="defaultCard">
						<ng-container top>
							<ng-content select="[top]"></ng-content>
						</ng-container>

						<ng-content></ng-content>

						<ng-container bottom>
							<ng-content select="[bottom]"></ng-content>
						</ng-container>
					</ff-card>

					<ng-content select="[after]"></ng-content>
				</div>
			</div>
		</div>
	`,
	styles: [`
		:host {
			display: block;
		}
	`]
})
export class FormSectionComponent implements OnInit {

	@HostBinding('class') clazz = 'ff-form-section';

	@Input() title: string;
	@Input() subtitle: string;
	@Input() padding = true;
	@Input() defaultCard = true;

	constructor() {
	}

	ngOnInit() {
	}
}
