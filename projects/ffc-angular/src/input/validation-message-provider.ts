export abstract class InputValidationMessageProvider {
	abstract getValidationMessage(validatorName: string, validatorValue?: any): string;
}

export class FakeInputValidationMessageProvider extends InputValidationMessageProvider {
	getValidationMessage(validatorName: string, validatorValue?: any): string {
		return null;
	}
}
