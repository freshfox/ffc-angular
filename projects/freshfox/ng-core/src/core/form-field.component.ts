import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
	EventEmitter,
	HostBinding,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, FormControl} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {InputValidationMessageProvider} from '../validation-message';

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ``
})
export class FFFormFieldComponent implements OnInit, ControlValueAccessor, OnChanges, OnDestroy, DoCheck {

	@HostBinding('class.ff-form-field') clazz = true;

	@Input() size: 'default' | 'large' = 'default';
	@Input() placeholder: string;
	@Input() label: string;
	@Input() formControl: FormControl;
	@Input() disabled = false;
	@Input() readonly = false;
	@Input() bottomPadding = true;

	@Input() model: any;
	@Output() modelChange = new EventEmitter<any>();

	// tslint:disable-next-line:no-output-native
	@Output() blur = new EventEmitter<any>();

	@HostBinding('class.ff-input--small')
	@HostBinding('class.ff-form-field--small')
	get isSmall() {
		return this.size === 'default';
	}

	@HostBinding('class.ff-input--no-bottom-padding')
	get noBottomPadding() {
		return !this.bottomPadding;
	}

	name: string;
	value: any = '';

	private touched = false;

	protected onDestroy$ = new Subject();

	private onTouchedCallback: () => void = () => {};
	private onChangeCallback: (_: any) => void = () => {};

	constructor(private validationMessageProvider: InputValidationMessageProvider, protected cdr: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		if (this.formControl) {
			this.formControl.valueChanges
				.pipe(takeUntil(this.onDestroy$))
				.subscribe(change => {
					this.model = change;
					this.modelChange.emit(change);
				});

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

	ngDoCheck(): void {
		if (this.formControl) {
			if (this.touched !== this.formControl.touched) {
				this.touched = this.formControl.touched;
				this.cdr.markForCheck();
			}
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.model) {
			this.formControl.patchValue(changes.model.currentValue);
		}
	}

	ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
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
		this.blur.emit(event);
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


import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {takeUntil} from 'rxjs/operators';

@NgModule({
	imports: [CommonModule],
	exports: [FFFormFieldComponent],
	declarations: [FFFormFieldComponent],
	providers: [],
})
export class FFFormFieldModule {
}
