import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	HostBinding,
	Input,
	OnChanges, OnDestroy,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputValidationMessageProvider} from './validation-message-provider';
import {Subscription} from 'rxjs';

@Component({
	selector: 'ff-input,ff-textarea',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <label *ngIf="isSmall && label">{{ label }}</label>

        <mat-form-field appearance="outline">
            <mat-label *ngIf="!isSmall && label">{{ label }}</mat-label>
            <input *ngIf="selector === 'ff-input' && formControl"
                   matInput
                   [placeholder]="placeholder"
                   [type]="type"
                   [name]="name"
                   [formControl]="formControl"
                   [attr.disabled]="disabled"
                   (blur)="onBlur($event)">

            <input *ngIf="selector === 'ff-input' && !formControl"
                   matInput
                   [placeholder]="placeholder"
                   [type]="type"
                   [name]="name"
                   [(ngModel)]="value"
                   (ngModelChange)="onChange()"
                   [attr.disabled]="disabled"
                   (blur)="onBlur($event)">

            <textarea *ngIf="selector === 'ff-textarea' && formControl"
                      matInput
					  [matTextareaAutosize]="autoSize"
                      [placeholder]="placeholder"
                      [name]="name"
                      [formControl]="formControl"
                      (blur)="onBlur($event)"
					  [rows]="textAreaRows"
                      [attr.disabled]="disabled"></textarea>

            <textarea *ngIf="selector === 'ff-textarea' && !formControl"
                      matInput
                      [placeholder]="placeholder"
                      [matTextareaAutosize]="autoSize"
                      [name]="name"
                      [(ngModel)]="value"
                      (ngModelChange)="onChange()"
                      (blur)="onBlur($event)"
					  [rows]="textAreaRows"
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
export class FFInputComponent implements OnInit, ControlValueAccessor, OnChanges, OnDestroy {

	@Input() type = 'text';
	@Input() size: 'default' | 'large' = 'default';
	@Input() placeholder: string;
	@Input() label: string;
	@Input() formControl: FormControl;
	@Input() disabled = false;
	@Input() autoSize = false;
	@Input() textAreaRows = 0;

	@Input() model: any;
	@Output() modelChange = new EventEmitter<any>();

	@Output() blur = new EventEmitter<any>();

	@HostBinding('class.ff-input--small')
	get isSmall() {
		return this.size === 'default';
	}

	name: string;
	value: any = '';
	selector: string;

	private formControlChangeSubscription: Subscription;

	private onTouchedCallback: () => void = () => {
	};
	private onChangeCallback: (_: any) => void = () => {
	};

	constructor(private validationMessageProvider: InputValidationMessageProvider, private el: ElementRef, private cdr: ChangeDetectorRef) {
		this.selector = this.el.nativeElement.tagName.toLowerCase();
	}

	ngOnInit(): void {
		if (this.formControl) {
			this.formControl.valueChanges
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

	ngOnChanges(changes: SimpleChanges) {
		if (changes.model) {
			this.formControl.patchValue(changes.model.currentValue);
		}
	}

	ngOnDestroy() {
		if (this.formControlChangeSubscription) {
			this.formControlChangeSubscription.unsubscribe();
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
