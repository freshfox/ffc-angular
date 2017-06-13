var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
let SpinnerComponent = class SpinnerComponent {
    ngOnInit() {
        this.interval = setInterval(() => {
            return this.progress;
        }, 200);
    }
    ngOnDestroy() {
        clearInterval(this.interval);
        this.interval = null;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], SpinnerComponent.prototype, "progress", void 0);
SpinnerComponent = __decorate([
    Component({
        selector: 'ff-spinner',
        template: `
        <md-progress-spinner mode="indeterminate" *ngIf="progress >= 100 || progress === undefined"></md-progress-spinner>
        <md-progress-spinner mode="determinate" [value]="progress"
                             *ngIf="progress > 0 && progress < 100"></md-progress-spinner>`,
        host: {
            'class': 'ff-spinner'
        }
    })
], SpinnerComponent);
export { SpinnerComponent };
//# sourceMappingURL=spinner.component.js.map