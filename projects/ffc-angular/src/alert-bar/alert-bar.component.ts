import {Component, Input} from '@angular/core';

@Component({
	selector: 'ff-alert-bar',
	template: `
		<div class="ff-alert-bar__inner" [ngClass]="getClasses()" *ngIf="message">
			<div class="ff-alert-bar__message" [innerHTML]="message"></div>
		</div>`,
	host: {
		'class': 'ff-alert-bar'
	}
})
export class AlertBarComponent {
	@Input() message: string;
	@Input() type: AlertBarType = AlertBarType.Error;

	getClasses() {
		return {
			'ff-alert-bar--success': this.type === AlertBarType.Success,
			'ff-alert-bar--warning': this.type === AlertBarType.Warning
		}
	}
}

export enum AlertBarType {
	Success = 'success' as any,
	Warning = 'warning' as any,
	Error = 'error' as any
}
