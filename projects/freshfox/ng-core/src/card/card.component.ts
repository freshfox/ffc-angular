import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
	selector: 'ff-card',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="shadow rounded-md overflow-hidden">
			<ng-content select="[top]"></ng-content>
			<div class="bg-white" [ngClass]="{ 'px-4 py-5 sm:p-6': padding }">
				<ng-content></ng-content>
			</div>
			<ng-content select="[bottom]"></ng-content>
		</div>
	`
})
export class CardComponent implements OnInit {

	@HostBinding('class') clazz = 'ff-card block';

	@Input() padding = true;

	constructor() {
	}

	ngOnInit() {
	}
}
