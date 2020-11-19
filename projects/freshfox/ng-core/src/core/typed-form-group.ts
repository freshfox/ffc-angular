import {AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn} from '@angular/forms';

export class TypedFormGroup<T> extends FormGroup {

	controls: {
		[key in keyof T]: AbstractControl;
	};

	readonly value: T;

	constructor(
		controls: { [key in keyof T]: AbstractControl; },
		validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
		asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
		super(controls, validatorOrOpts, asyncValidator);
	}

}
