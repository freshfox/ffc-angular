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
var ConfirmComponent = (function () {
    function ConfirmComponent() {
    }
    ConfirmComponent.prototype.ngOnInit = function () {
    };
    ConfirmComponent.prototype.confirm = function () {
        this.onConfirm();
    };
    ConfirmComponent.prototype.cancel = function () {
        this.onCancel();
    };
    return ConfirmComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ConfirmComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ConfirmComponent.prototype, "message", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Function)
], ConfirmComponent.prototype, "onCancel", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Function)
], ConfirmComponent.prototype, "onConfirm", void 0);
ConfirmComponent = __decorate([
    core_1.Component({
        selector: 'ff-confirm',
        template: "\n        <div class=\"modal-header\" *ngIf=\"title\">\n            {{ title }}\n        </div>\n\n        <div class=\"modal-inner\">\n            <p class=\"nmb\">{{ message }}</p>\n        </div>\n\n        <div class=\"modal-footer\">\n            <button ff-button class=\"button--secondary\" (click)=\"cancel()\">{{ 'general.cancel' | translate }}</button>\n            <button ff-button (click)=\"confirm()\">{{ 'general.delete' | translate }}</button>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [])
], ConfirmComponent);
exports.ConfirmComponent = ConfirmComponent;
//# sourceMappingURL=confirm.component.js.map