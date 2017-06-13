import {Injectable, ModuleWithProviders, NgModule, Provider} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {IconComponent} from "./components/icon.component";
import {ButtonComponent} from "./components/button.component";
import {SpinnerComponent} from "./components/spinner.component";
import {FFMaterialModule} from "./components/material.module";
import {ConfirmComponent} from "./components/confirm.component";
import {ControlMessagesComponent} from "./components/control-messages.component";
import {InputComponent} from "./components/input.component";
import {SelectComponent} from "./components/select.component";

export * from './components';
export * from './directives';
export * from './services';


@NgModule({
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
export class FFCoreModule {

    static forRoot(config: FFCoreModuleConfig = {}): ModuleWithProviders {
        return {
            ngModule: FFCoreModule,
            providers: [
                config.validationMessageProvider || {provide: ValidationMessageProvider, useClass: FakeValidationMessageProvider},
            ]
        };
    }
}


export interface FFCoreModuleConfig {
    validationMessageProvider?: Provider;
}

export abstract class ValidationMessageProvider {
    abstract getValidationMessage(validatorName: string, validatorValue?: any): string;
}

@Injectable()
export class FakeValidationMessageProvider extends ValidationMessageProvider {
    getValidationMessage(validatorName: string, validatorValue?: any): string {
        return '';
    }
}
