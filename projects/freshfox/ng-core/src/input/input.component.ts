import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, HostBinding, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputValidationMessageProvider} from './validation-message-provider';

@Component({
	selector: 'ff-input,ff-textarea',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <label *ngIf="isSmall && label">{{ label }}</label>

        <mat-form-field appearance="outline">
            <mat-label *ngIf="!isSmall && label">{{ label }}</mat-label>
            <input *ngIf="selector === 'ff-input'"
                   matInput
                   [placeholder]="placeholder"
                   [type]="type"
                   [name]="name"
                   [formControl]="formControl"
                   [(ngModel)]="value"
                   (ngModelChange)="onChange()"
                   [attr.disabled]="disabled"
                   (blur)="onBlur($event)">

            <textarea *ngIf="selector === 'ff-textarea'"
                      matInput
                      [placeholder]="placeholder"
                      [name]="name"
                      [formControl]="formControl"
                      [(ngModel)]="value"
                      (blur)="onBlur($event)"
                      (ngModelChange)="onChange()"
                      [attr.disabled]="disabled"></textarea>
            <mat-error *ngIf="errorMessage">{{ errorMessage }}</mat-error>
        </mat-form-field>
	`,
	host: {
		'class': 'ff-input'
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FFInputComponent),
			multi: true
		}
	]
})
export class FFInputComponent implements OnInit, ControlValueAccessor {

	@Input() type = 'text';
	@Input() size: 'default' | 'large' = 'default';
	@Input() placeholder: string;
	@Input() label: string;
	@Input() formControl: FormControl = new FormControl();
	@Input() disabled = false;

	@HostBinding('class.ff-input--small')
	get isSmall() {
		return this.size === 'default';
	}

	name: string;
	value: any = '';
	selector: string;

	private onTouchedCallback: () => void = () => {
	};
	private onChangeCallback: (_: any) => void = () => {
	};

	constructor(private validationMessageProvider: InputValidationMessageProvider, private el: ElementRef, private cdr: ChangeDetectorRef) {
		this.selector = this.el.nativeElement.tagName.toLowerCase();
	}

	ngOnInit(): void {
		if (this.formControl) {
			const parent = this.formControl.parent;
			if (!parent) {
				return;
			}
			const siblings = Object.keys(parent.controls);
			for (const key of siblings) {
				if (parent.controls[key] === this.formControl) {
					this.name = key;
				}
			}
		}

	}

	get errorMessage() {
		if (this.formControl) {
			for (const propertyName in this.formControl.errors) {
				if (this.formControl.errors.hasOwnProperty(propertyName) && this.formControl.touched) {
					return this.validationMessageProvider.getValidationMessage(propertyName, this.formControl.errors[propertyName]);
				}
			}
		}

		return null;
	}

	onChange() {
		if (this.formControl) {
			this.formControl.patchValue(this.value);
		}

		this.onChangeCallback(this.value);
	}

	onBlur(event) {
		this.onTouchedCallback();
	}

	// Value Accessor methods
	writeValue(value: any) {
		this.value = value;
		this.cdr.markForCheck();
	}

	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}

}
