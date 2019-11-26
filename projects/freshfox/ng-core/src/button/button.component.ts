import {Component, HostBinding, Input} from '@angular/core';

@Component({
	selector: 'button[ff-button]',
	template: `
        <div class="ff-button__text" [style.visibility]="loading ? 'hidden' : 'visible'">
            <ng-content></ng-content>
        </div>
        <mat-spinner *ngIf="loading"></mat-spinner>
	`,
	host: {
		'[attr.disabled]': 'disabled ? true : null',
	}
})
export class ButtonComponent {

	@Input() loading = false;
	@Input() class = '';
	@Input() icon: string;
	@Input() disabled = false;

	@HostBinding('class')
	get clazz() {
		return `ff-button ${this.class}`;
	}

	constructor() {
	}
}
