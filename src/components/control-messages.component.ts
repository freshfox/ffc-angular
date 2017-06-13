import {Component, Input} from "@angular/core";
import {FormControl} from "@angular/forms";
import {ValidationMessageProvider} from "../core.module";

@Component({
    selector: 'ff-control-messages',
    template: `<div class="control-message" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
    @Input() control: FormControl;


    constructor(private validatoinMessageProvider: ValidationMessageProvider) {

    }

    get errorMessage() {
        if (this.control) {
            for (let propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    return this.validatoinMessageProvider.getValidationMessage(propertyName,  this.control.errors[propertyName]);
                }
            }
        }

        return null;
    }
}
