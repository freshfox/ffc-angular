import {Component, Input} from "@angular/core";
import {FormControl} from "@angular/forms";
import {FormValidator} from "../form-validator";

@Component({
    selector: 'ff-control-messages',
    template: `<div class="control-message" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
    @Input() control: FormControl;

    get errorMessage() {
        if (this.control) {
            for (let propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    return FormValidator.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
                }
            }
        }

        return null;
    }
}
