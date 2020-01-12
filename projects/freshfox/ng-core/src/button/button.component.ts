import {ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
	selector: 'button[ff-button]',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <div class="ff-button__text" [style.visibility]="loading ? 'hidden' : 'visible'">
            <ng-content></ng-content>
        </div>
        <mat-spinner *ngIf="loading" @fade></mat-spinner>
	`,
	animations: [
		trigger('fade', [
			state('in', style({opacity: 1})),
			transition(':enter', [
				style({opacity: 0}),
				animate(300)
			]),
			transition(':leave',
				animate(300, style({opacity: 0})))
		])
	],
	host: {
		'[attr.disabled]': '(disabled || loading) ? true : null',
	}
})
export class ButtonComponent {

	@Input() loading = false;
	@Input() icon: string;
	@Input() disabled = false;

	constructor(elementRef: ElementRef) {
		elementRef.nativeElement.classList.add('ff-button');
	}
}
