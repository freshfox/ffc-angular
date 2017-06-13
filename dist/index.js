"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var icon_component_1 = require("./components/icon.component");
var button_component_1 = require("./components/button.component");
var spinner_component_1 = require("./components/spinner.component");
var material_module_1 = require("./components/material.module");
var confirm_component_1 = require("./components/confirm.component");
var control_messages_component_1 = require("./components/control-messages.component");
var input_component_1 = require("./components/input.component");
var select_component_1 = require("./components/select.component");
__export(require("./components"));
__export(require("./directives"));
__export(require("./services"));
var FFCoreModule = FFCoreModule_1 = (function () {
    function FFCoreModule() {
    }
    FFCoreModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: FFCoreModule_1,
            providers: [
                config.validationMessageProvider || { provide: ValidationMessageProvider, useClass: FakeValidationMessageProvider },
            ]
        };
    };
    return FFCoreModule;
}());
FFCoreModule = FFCoreModule_1 = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, material_module_1.FFMaterialModule],
        declarations: [
            icon_component_1.IconComponent,
            button_component_1.ButtonComponent,
            spinner_component_1.SpinnerComponent,
            confirm_component_1.ConfirmComponent,
            control_messages_component_1.ControlMessagesComponent,
            input_component_1.InputComponent,
            select_component_1.SelectComponent,
        ],
        exports: [
            icon_component_1.IconComponent,
            button_component_1.ButtonComponent,
            spinner_component_1.SpinnerComponent,
            confirm_component_1.ConfirmComponent,
            control_messages_component_1.ControlMessagesComponent,
            input_component_1.InputComponent,
            select_component_1.SelectComponent,
        ],
    })
], FFCoreModule);
exports.FFCoreModule = FFCoreModule;
var ValidationMessageProvider = (function () {
    function ValidationMessageProvider() {
    }
    return ValidationMessageProvider;
}());
exports.ValidationMessageProvider = ValidationMessageProvider;
var FakeValidationMessageProvider = (function (_super) {
    __extends(FakeValidationMessageProvider, _super);
    function FakeValidationMessageProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FakeValidationMessageProvider.prototype.getValidationMessage = function (validatorName, validatorValue) {
        return '';
    };
    return FakeValidationMessageProvider;
}(ValidationMessageProvider));
FakeValidationMessageProvider = __decorate([
    core_1.Injectable()
], FakeValidationMessageProvider);
exports.FakeValidationMessageProvider = FakeValidationMessageProvider;
var FFCoreModule_1;
//# sourceMappingURL=index.js.map