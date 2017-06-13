var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input } from "@angular/core";
import * as Ladda from 'ladda';
let ButtonComponent = class ButtonComponent {
    constructor(el) {
        this.el = el;
        this.disabled = false;
    }
    ngAfterViewInit() {
        if (typeof this.loading !== 'undefined') {
            this.laddaButton = Ladda.create(this.el.nativeElement);
            this.updateLoadingState(this.loading);
        }
    }
    ngOnChanges(changes) {
        for (let propName in changes) {
            if (propName === 'loading') {
                let changedProp = changes[propName];
                this.updateLoadingState(changedProp.currentValue);
            }
        }
    }
    ngOnDestroy() {
        if (this.laddaButton) {
            this.laddaButton.remove();
        }
    }
    updateLoadingState(newLoadingState) {
        if (this.laddaButton) {
            if (newLoadingState) {
                this.laddaButton.start();
            }
            else {
                this.laddaButton.stop();
            }
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "loading", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "class", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "icon", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ButtonComponent.prototype, "disabled", void 0);
ButtonComponent = __decorate([
    Component({
        selector: '[ff-button]',
        template: `
        <div class="ff-button__inner">
            <ff-icon *ngIf="icon" [name]="icon"></ff-icon>
            <span class="ladda-label">
                <ng-content></ng-content>
            </span>
        </div>`,
        host: {
            '[class]': '"ff-button" + class',
            'data-style': 'zoom-in',
            '[attr.disabled]': 'disabled ? true : null',
        }
    }),
    __metadata("design:paramtypes", [ElementRef])
], ButtonComponent);
export { ButtonComponent };
//# sourceMappingURL=button.component.js.map