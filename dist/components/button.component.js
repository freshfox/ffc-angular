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
var Ladda = require("ladda");
var ButtonComponent = (function () {
    function ButtonComponent(el) {
        this.el = el;
        this.disabled = false;
    }
    ButtonComponent.prototype.ngAfterViewInit = function () {
        if (typeof this.loading !== 'undefined') {
            this.laddaButton = Ladda.create(this.el.nativeElement);
            this.updateLoadingState(this.loading);
        }
    };
    ButtonComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            if (propName === 'loading') {
                var changedProp = changes[propName];
                this.updateLoadingState(changedProp.currentValue);
            }
        }
    };
    ButtonComponent.prototype.ngOnDestroy = function () {
        if (this.laddaButton) {
            this.laddaButton.remove();
        }
    };
    ButtonComponent.prototype.updateLoadingState = function (newLoadingState) {
        if (this.laddaButton) {
            if (newLoadingState) {
                this.laddaButton.start();
            }
            else {
                this.laddaButton.stop();
            }
        }
    };
    return ButtonComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "loading", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "class", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonComponent.prototype, "disabled", void 0);
ButtonComponent = __decorate([
    core_1.Component({
        selector: '[ff-button]',
        template: "\n        <div class=\"ff-button__inner\">\n            <ff-icon *ngIf=\"icon\" [name]=\"icon\"></ff-icon>\n            <span class=\"ladda-label\">\n                <ng-content></ng-content>\n            </span>\n        </div>",
        host: {
            '[class]': '"ff-button" + class',
            'data-style': 'zoom-in',
            '[attr.disabled]': 'disabled ? true : null',
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ButtonComponent);
exports.ButtonComponent = ButtonComponent;
//# sourceMappingURL=button.component.js.map