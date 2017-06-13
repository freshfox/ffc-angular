import { ModuleWithProviders, Provider } from "@angular/core";
export * from './components/button.component';
export * from './components/confirm.component';
export * from './components/control-messages.component';
export * from './components/icon.component';
export * from './components/icon.component';
export * from './components/input.component';
export * from './components/material.module';
export * from './components/modal.component';
export * from './components/select.component';
export * from './components/spinner.component';
export * from './services/modal.service';
export * from './directives/input-date.directive';
export declare class FFCoreModule {
    static forRoot(config?: FFCoreModuleConfig): ModuleWithProviders;
}
export interface FFCoreModuleConfig {
    validationMessageProvider?: Provider;
}
export declare abstract class ValidationMessageProvider {
    abstract getValidationMessage(validatorName: string, validatorValue?: any): string;
}
export declare class FakeValidationMessageProvider extends ValidationMessageProvider {
    getValidationMessage(validatorName: string, validatorValue?: any): string;
}
