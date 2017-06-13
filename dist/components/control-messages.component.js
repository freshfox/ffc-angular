"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_module_1 = require("../core.module");
var ControlMessagesComponent = (function () {
    function ControlMessagesComponent(validatoinMessageProvider) {
        this.validatoinMessageProvider = validatoinMessageProvider;
    }
    Object.defineProperty(ControlMessagesComponent.prototype, "errorMessage", {
        get: function () {
            if (this.control) {
                for (var propertyName in this.control.errors) {
                    if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                        return this.validatoinMessageProvider.getValidationMessage(propertyName, this.control.errors[propertyName]);
                    }
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return ControlMessagesComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormControl)
], ControlMessagesComponent.prototype, "control", void 0);
ControlMessagesComponent = __decorate([
    core_1.Component({
        selector: 'ff-control-messages',
        template: "<div class=\"control-message\" *ngIf=\"errorMessage !== null\">{{errorMessage}}</div>"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_module_1.ValidationMessageProvider !== "undefined" && core_module_1.ValidationMessageProvider) === "function" && _a || Object])
], ControlMessagesComponent);
exports.ControlMessagesComponent = ControlMessagesComponent;
var _a;
//# sourceMappingURL=control-messages.component.js.map