import { ModuleWithProviders, Provider } from "@angular/core";
export * from './components';
export * from './directives';
export * from './services';
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
