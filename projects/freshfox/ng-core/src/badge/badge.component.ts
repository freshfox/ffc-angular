import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
	selector: 'ff-badge',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-content></ng-content>
	`
})
export class BadgeComponent implements OnInit {

	@Input() size: 'small' | 'default' = 'default';
	@Input() type: 'info' | 'info_alt' | 'error' | 'warn' | 'success' = null;

	constructor() {
	}

	ngOnInit() {
	}

	@HostBinding('class')
	get classList() {
		const classes: string[] = ['ff-badge rounded px-2 py-0.5 font-medium inline-flex items-center'];
		switch (this.type) {
			case 'error':
				classes.push('bg-red-100', 'text-red-700');
				break;
			case 'warn':
				classes.push('bg-yellow-100', 'text-yellow-900');
				break;
			case 'info':
				classes.push('bg-indigo-100', 'text-indigo-800');
				break;
			case 'info_alt':
				classes.push('bg-purple-100', 'text-purple-800');
				break;
			case 'success':
				classes.push('bg-green-100', 'text-green-700');
				break;
			default:
				classes.push('bg-gray-200', 'text-gray-700');
		}

		switch (this.size) {
			case 'default':
				classes.push('text-sm');
				break;
			case 'small':
				classes.push('text-xs');
		}

		return classes.join(' ');
	}
}
