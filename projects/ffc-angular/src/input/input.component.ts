import {Component, forwardRef, HostBinding, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputValidationMessageProvider} from './validation-message-provider';

@Component({
	selector: 'ff-input',
	template: `
        <mat-form-field>
            <mat-label>{{ placeholder || '' }}</mat-label>
            <input
                    matInput
                    [type]="type"
                    [name]="name"
                    [(ngModel)]="value"
                    [formControl]="formControl"
                    (ngModelChange)="onChange()"
                    (blur)="onBlur($event)">
            <mat-error *ngIf="errorMessage">{{ errorMessage }}</mat-error>
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
export class FFInputComponent implements OnInit, ControlValueAccessor {

	@Input() type = 'text';
	@Input() size: 'default' | 'large' = 'default';
	@Input() placeholder: string;
	@Input() formControl: FormControl = new FormControl();

	@HostBinding('class') clazz = 'ff-input';

	@HostBinding('class.ff-input--small')
	get isSmall() {
		return this.size === 'default';
	}

	name: string;
	value: any = '';

	private onTouchedCallback: () => void = () => {
	};
	private onChangeCallback: (_: any) => void = () => {
	};

	constructor(private validationMessageProvider: InputValidationMessageProvider) {

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
		this.onChangeCallback(this.value);
	}

	onBlur(event) {
		this.onTouchedCallback();
	}

	// Value Accessor methods
	writeValue(value: any) {
		this.value = value;
	}

	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}

}
