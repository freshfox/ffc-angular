import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';

export function formValidatorEqual(group: FormGroup): ValidationErrors {
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
		if (currentControl.errors && currentControl.errors.notEqual) {
			delete currentControl.errors.notEqual;
			currentControl.updateValueAndValidity();
		}
		return null;
	}

	const errors = {passwordsNotEqual: true};
	if (!currentControl.errors) {
		currentControl.setErrors(errors);
		return errors;
	}

	return null;
}
