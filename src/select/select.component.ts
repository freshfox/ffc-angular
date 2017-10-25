import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChange, ViewChild
} from '@angular/core';

import Choices from 'choices.js';

@Component({
	selector: 'ff-select',
	template: `
        <label *ngIf="label">{{ label }}</label>
        <select #s class="{{ class }}" [disabled]="disabledSet">
            <option
                    *ngFor="let option of options"
                    [attr.value]="getValue(option)">{{ getName(option) }}
            </option>
        </select>`,
	host: {
		'class': 'ff-select',
		'[class.ff-focused]': 'isFocused',
	}
})
export class SelectComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

	@Input() options: any;
	@Input() valueKey = 'id';
	@Input() nameKey = 'name';
	@Input() class: string;

	@Input()
	public set disabled(value: any) {
		this.disabledSet = true;
	}

	@Input() selectedOption: any;
	@Output() selectedOptionChange = new EventEmitter<any>();

	@Input() selectedValue: any;
	@Output() selectedValueChange = new EventEmitter<any>();

	@Input() label: string;

	@Input() enableSearchField = true;

	@ViewChild('s') private selectEl: ElementRef;

	disabledSet = false;
	private select;
	private $select;
	private initialValue;
	private isFocused = false;

	constructor() {
	}

	ngOnInit() {
		if (this.selectedOption) {
			this.selectedValue = this.getValue(this.selectedOption);
		}

		let emit = false;
		if (this.selectedValue) {
			this.initialValue = this.selectedValue;
		} else {
			this.initialValue = this.getValueForIndex(0);
			emit = true;
		}

		setTimeout(() => {
			this.selectedValue = this.initialValue;
			if (emit) {
				this.selectedValueChange.emit(this.initialValue);
			}
		}, 1);


		this.selectedValueChange.subscribe((value) => {
			const option = this.getOptionForValue(value);
			this.selectedOptionChange.emit(option);
		});
	}

	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		for (const propName in changes) {
			if (propName === 'selectedValue') {
				this.updateValue();
			}

			if (propName === 'selectedOption') {
				this.selectedValue = this.getValue(this.selectedOption);
				this.updateValue();
			}
		}
	}

	ngAfterViewInit() {
		this.select = this.selectEl.nativeElement;

		this.$select = new Choices(this.select, {
			searchEnabled: this.enableSearchField,
			itemSelectText: '',
		});

		this.select.addEventListener('choice', (event) => {
			let value = event.detail.choice.value;
			if (value === '') {
				value = null;
			}

			this.selectedValue = value;
			this.onChange();
		});

		this.updateValue();
	}

	private getOptionForValue(value) {
		return this.options.find((option) => {
			return this.getValue(option) === value;
		});
	}

	private updateValue() {
		if (this.$select) {
			this.$select.setValueByChoice(this.selectedValue);
		}
	}

	ngOnDestroy() {
		this.$select.destroy();
	}

	getValue(option) {
		const value = option[this.valueKey]
		return (value === undefined || value === null) ? '' : value;
	}

	private getValueForIndex(index: number) {
		return this.getValue(this.options[index]);
	}

	getName(option) {
		return option[this.nameKey] || this.getValue(option);
	}

	onChange() {
		this.selectedValueChange.emit(this.selectedValue);
	}

}
