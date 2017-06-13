var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IconComponent } from "./components/icon.component";
import { ButtonComponent } from "./components/button.component";
import { SpinnerComponent } from "./components/spinner.component";
import { FFMaterialModule } from "./components/material.module";
import { ConfirmComponent } from "./components/confirm.component";
import { ControlMessagesComponent } from "./components/control-messages.component";
import { InputComponent } from "./components/input.component";
import { SelectComponent } from "./components/select.component";
export * from './components';
export * from './directives';
export * from './services';
let FFCoreModule = FFCoreModule_1 = class FFCoreModule {
    static forRoot(config = {}) {
        return {
            ngModule: FFCoreModule_1,
            providers: [
                config.validationMessageProvider || { provide: ValidationMessageProvider, useClass: FakeValidationMessageProvider },
            ]
        };
    }
};
FFCoreModule = FFCoreModule_1 = __decorate([
    NgModule({
        imports: [BrowserModule, FFMaterialModule],
        declarations: [
            IconComponent,
            ButtonComponent,
            SpinnerComponent,
            ConfirmComponent,
            ControlMessagesComponent,
            InputComponent,
            SelectComponent,
        ],
        exports: [
            IconComponent,
            ButtonComponent,
            SpinnerComponent,
            ConfirmComponent,
            ControlMessagesComponent,
            InputComponent,
            SelectComponent,
        ],
    })
], FFCoreModule);
export { FFCoreModule };
export class ValidationMessageProvider {
}
let FakeValidationMessageProvider = class FakeValidationMessageProvider extends ValidationMessageProvider {
    getValidationMessage(validatorName, validatorValue) {
        return '';
    }
};
FakeValidationMessageProvider = __decorate([
    Injectable()
], FakeValidationMessageProvider);
export { FakeValidationMessageProvider };
var FFCoreModule_1;
//# sourceMappingURL=index.js.map