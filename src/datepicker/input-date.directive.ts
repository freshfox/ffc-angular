import {Directive, ElementRef, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as Pikaday from 'pikaday';

// Workaround for the fact that numbro doesn't have a default export
// See https://github.com/rollup/rollup/issues/670#issuecomment-281139978
import * as moment_ from 'moment';
let moment: any = (<any>moment_).default || moment_;

export const DATEPICKER_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DatePickerDirective),
	multi: true
};

@Directive({
	selector: 'input[ff-datepicker]',
	providers: [DATEPICKER_VALUE_ACCESSOR],
	host: {'(change)': 'onChange()', '(blur)': 'onTouched()'},
})
export class DatePickerDirective implements OnInit, ControlValueAccessor, OnDestroy {

	private picker: any;
	private format: string = 'DD.MM.YYYY';
	private date: Date;

	private onChangeCallback: (_: any) => void = () => {
	};


	onTouched = () => {
	};

	constructor(private el: ElementRef) {
	}

	ngOnInit() {
		this.picker = new Pikaday({
			field: this.el.nativeElement,
			format: this.format,
			i18n: {
				months: moment.localeData().months(),
				weekdays: moment.localeData().weekdays(),
				weekdaysShort: moment.localeData().weekdaysShort()
			}
		} as any);
		document.removeEventListener('keydown', this.picker._onKeyChange);
	}

	ngOnDestroy() {
		this.picker.destroy();
	}

	writeValue(value: Date): void {
		if (value === undefined || value === null) {
			value = new Date();
		}
		this.setDate(value);
		this.onChange();
	}

	private setDate(date: Date) {
		this.date = date;
		this.picker.setDate(date);
	}

	onChange() {
		let val = this.el.nativeElement.value;
		const momentInstance = moment(val, this.format);
		if (momentInstance.isValid()) {
			const date = momentInstance.toDate();
			this.date.setFullYear(date.getFullYear());
			this.date.setMonth(date.getMonth());
			this.date.setDate(date.getDate());

			val = this.date;
		} else {
			val = new Date();
			this.setDate(val);
		}

		this.onChangeCallback(val);
	}

	registerOnChange(fn: (_: any) => {}): void {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: () => {}): void {
		this.onTouched = fn;
	}

}
