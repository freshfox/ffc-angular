import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, HostBinding, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FFFormFieldComponent} from '../core/form-field.component';
import {InputValidationMessageProvider} from '../validation-message/index';

@Component({
	selector: 'ff-input,ff-textarea',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<label *ngIf="isSmall && label" class="ff-input__label">{{ label }}</label>

		<mat-form-field appearance="outline">
			<mat-label *ngIf="!isSmall && label">{{ label }}</mat-label>

			<ng-container matPrefix>
				<ng-content select="[ffPrefix]"></ng-content>
			</ng-container>

			<ng-container matSuffix>
				<ng-content select="[ffSuffix]"></ng-content>
			</ng-container>

			<input *ngIf="selector === 'ff-input' && formControl"
				   matInput
				   [placeholder]="placeholder"
				   [type]="type"
				   [name]="name"
				   [formControl]="formControl"
				   [disabled]="disabled"
				   [readonly]="readonly"
				   (blur)="onBlur($event)">

			<input *ngIf="selector === 'ff-input' && !formControl"
				   matInput
				   [placeholder]="placeholder"
				   [type]="type"
				   [name]="name"
				   [(ngModel)]="value"
				   (ngModelChange)="onChange()"
				   [disabled]="disabled"
				   [readonly]="readonly"
				   (blur)="onBlur($event)">

			<textarea *ngIf="selector === 'ff-textarea' && formControl"
					  matInput
					  [matTextareaAutosize]="autoSize"
					  [placeholder]="placeholder"
					  [name]="name"
					  [formControl]="formControl"
					  (blur)="onBlur($event)"
					  [rows]="textAreaRows"
					  [readonly]="readonly"
					  [disabled]="disabled"></textarea>

			<textarea *ngIf="selector === 'ff-textarea' && !formControl"
					  matInput
					  [placeholder]="placeholder"
					  [matTextareaAutosize]="autoSize"
					  [name]="name"
					  [(ngModel)]="value"
					  (ngModelChange)="onChange()"
					  (blur)="onBlur($event)"
					  [rows]="textAreaRows"
					  [readonly]="readonly"
					  [disabled]="disabled"></textarea>

			<mat-error *ngIf="errorMessage">{{ errorMessage }}</mat-error>
			<mat-hint *ngIf="hint">{{ hint }}</mat-hint>
		</mat-form-field>
	`,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FFInputComponent),
			multi: true
		}
	]
})
export class FFInputComponent extends FFFormFieldComponent {

	@HostBinding('class.ff-input') ffInputClass = true;

	@Input() type = 'text';
	@Input() autoSize = false;
	@Input() textAreaRows = 0;

	readonly selector: string;

	constructor(validationMessageProvider: InputValidationMessageProvider, private el: ElementRef, cdr: ChangeDetectorRef) {
		super(validationMessageProvider, cdr);

		this.selector = this.el.nativeElement.tagName.toLowerCase();
	}
}
