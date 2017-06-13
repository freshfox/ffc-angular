import { FormControl } from "@angular/forms";
import { ValidationMessageProvider } from "../index";
export declare class ControlMessagesComponent {
    private validatoinMessageProvider;
    control: FormControl;
    constructor(validatoinMessageProvider: ValidationMessageProvider);
    readonly errorMessage: string;
}
