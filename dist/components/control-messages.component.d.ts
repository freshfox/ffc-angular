import { FormControl } from "@angular/forms";
import { ValidationMessageProvider } from "../core.module";
export declare class ControlMessagesComponent {
    private validatoinMessageProvider;
    control: FormControl;
    constructor(validatoinMessageProvider: ValidationMessageProvider);
    readonly errorMessage: string;
}
