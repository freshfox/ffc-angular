import {Injectable} from '@angular/core';
import {InputValidationMessageProvider} from '@freshfox/ng-core';

@Injectable()
export class ValidationProvider extends InputValidationMessageProvider {

	getValidationMessage(validatorName: string, validatorValue?: any): string {
		return validatorName;
	}
}
