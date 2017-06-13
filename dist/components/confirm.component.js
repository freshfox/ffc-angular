var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output } from "@angular/core";
let ConfirmComponent = class ConfirmComponent {
    constructor() {
    }
    ngOnInit() {
    }
    confirm() {
        this.onConfirm();
    }
    cancel() {
        this.onCancel();
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], ConfirmComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ConfirmComponent.prototype, "message", void 0);
__decorate([
    Output(),
    __metadata("design:type", Function)
], ConfirmComponent.prototype, "onCancel", void 0);
__decorate([
    Output(),
    __metadata("design:type", Function)
], ConfirmComponent.prototype, "onConfirm", void 0);
ConfirmComponent = __decorate([
    Component({
        selector: 'ff-confirm',
        template: `
        <div class="modal-header" *ngIf="title">
            {{ title }}
        </div>

        <div class="modal-inner">
            <p class="nmb">{{ message }}</p>
        </div>

        <div class="modal-footer">
            <button ff-button class="button--secondary" (click)="cancel()">{{ 'general.cancel' | translate }}</button>
            <button ff-button (click)="confirm()">{{ 'general.delete' | translate }}</button>
        </div>
    `
    }),
    __metadata("design:paramtypes", [])
], ConfirmComponent);
export { ConfirmComponent };
//# sourceMappingURL=confirm.component.js.map