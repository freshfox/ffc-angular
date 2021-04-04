import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
	selector: 'ff-card',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-content select="[top]"></ng-content>
		<div class="bg-white" [ngClass]="{ 'px-4 py-5 sm:p-6': padding }">
			<ng-content></ng-content>
		</div>
		<ng-content select="[bottom]"></ng-content>
	`
})
export class CardComponent implements OnInit {

	@HostBinding('class') clazz = 'ff-card block shadow rounded-md overflow-hidden';

	@Input() padding = true;

	constructor() {
	}

	ngOnInit() {
	}
}
