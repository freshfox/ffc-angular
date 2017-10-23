import {FormGroup} from '@angular/forms';

export class FormHelpers {

	static validateAllFields(formGroup: FormGroup) {
		for (const i in formGroup.controls) {
			const control = formGroup.controls[i];
			control.markAsTouched();

			if (control instanceof FormGroup) {
				FormHelpers.validateAllFields(<FormGroup>control);
			}
		}
	}

}