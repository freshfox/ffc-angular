import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import moment from 'moment';
import * as validator from 'validator';

export class FormValidator {

	static date(control: FormControl) {
		const value = control.value;
		const date = moment(value);
		if (!date.isValid()) {
			return {
				invalidDate: true
			};
		}

		return null;
	}

	static number(control: FormControl) {
		let value = control.value;
		if (value) {
			value = `${value}`;
			if (!FormValidator.isNumeric(value)) {
				return {
					notNumeric: true
				};
			}
		}

		return null;
	}

	private static isNumeric(value: string) {
		return validator.isNumeric(value);
	}

	static equal(group: FormGroup) {
		let valid = true;

		let lastVal: string;
		let currentControl: AbstractControl;
		for (const key of Object.keys(group.controls)) {
			currentControl = group.controls[key];
			const val = currentControl.value;
			if (lastVal && val !== lastVal) {
				valid = false;
			}
			lastVal = val;
		}

		if (valid) {
			if (currentControl.errors && currentControl.errors['notEqual']) {
				delete currentControl.errors['notEqual'];
				currentControl.updateValueAndValidity();
			}
			return null;
		}

		if (!currentControl.errors) {
			return currentControl.setErrors({passwordsNotEqual: true});
		}

		return null;
	}

}
