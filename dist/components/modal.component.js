var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Injector, ViewChild, ViewContainerRef } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ModalService } from "../services/modal.service";
let ModalPlaceholderComponent = class ModalPlaceholderComponent {
    constructor(modalService, injector) {
        this.modalService = modalService;
        this.injector = injector;
        this.isShown = false;
        this.padding = false;
        this.modalSize = ModalSize.Regular;
        this.clean = false;
        this.showCloseButton = true;
    }
    get state() {
        return this.isShown ? 'shown' : 'hidden';
    }
    ngOnInit() {
        this.modalService.registerInjector(this.injector);
        this.modalService.registerPlaceholder(this);
    }
    ngAfterViewInit() {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
    }
    registerComponentRef(componentRef) {
        this.componentRef = componentRef;
    }
    isLarge() {
        return this.modalSize == ModalSize.Large;
    }
    isFullWidth() {
        return this.modalSize == ModalSize.FullWidth;
    }
    isClean() {
        return this.clean;
    }
    onBackdropClicked() {
        this.hide();
    }
    show() {
        this.isShown = true;
        let body = document.querySelector('body');
        body.className += ' no-scroll';
    }
    hide() {
        this.isShown = false;
        this.unlockBodyScroll();
    }
    modalAnimationDone(event) {
        if (event.toState === 'hidden' && this.componentRef) {
            this.componentRef.destroy();
        }
    }
    unlockBodyScroll() {
        this.removeClass(document.querySelector('body'), 'no-scroll');
    }
    removeClass(element, clazz) {
        let newClassName = "";
        let i;
        let classes = element.className.split(" ");
        for (i = 0; i < classes.length; i++) {
            if (classes[i] !== clazz) {
                newClassName += classes[i] + " ";
            }
        }
        element.className = newClassName;
    }
};
__decorate([
    ViewChild("modalplaceholder", { read: ViewContainerRef }),
    __metadata("design:type", Object)
], ModalPlaceholderComponent.prototype, "viewContainerRef", void 0);
ModalPlaceholderComponent = __decorate([
    Component({
        selector: "ff-modal-placeholder",
        template: `
        <div class="modal-outer" [@modalOuter]="state">
            <div [@modal]="state" (@modal.done)="modalAnimationDone($event)" tabindex="1" class="modal"
                 [class.modal--no-padding]="!padding"
                 [class.modal--large]="isLarge()"
                 [class.modal--full-width]="isFullWidth()"
                 [class.modal--clean]="isClean()">
                <div class="modal-dialog">
                    <div class="modal-dialog__inner">
                        <ng-template #modalplaceholder></ng-template>
                        <nvry-button *ngIf="showCloseButton && !clean" class="button--clear modal__close-button-inside"
                                     (click)="hide()">
                            <nvry-icon name="cross"></nvry-icon>
                        </nvry-button>
                    </div>
                </div>
            </div>
            <div [@backdrop]="state" class="modal-backdrop" (click)="onBackdropClicked()"></div>
            <button ff-button *ngIf="showCloseButton && clean" class="modal__close-button" [@closeButton]="state"
                         (click)="hide()">
                <ff-icon name="cross"></ff-icon>
            </button>
        </div>
    `,
        animations: [
            trigger('modalOuter', [
                state('shown', style({ display: 'flex' })),
                state('hidden', style({ display: 'none' })),
                transition('hidden <=> shown', [
                    animate('0.2s ease')
                ])
            ]),
            trigger('modal', [
                state('shown', style({ transform: 'scale3d(1, 1, 1)', opacity: 1, display: 'block' })),
                state('hidden', style({ transform: 'scale3d(0.7, 0.7, 0.7)', opacity: 0 })),
                transition('hidden <=> shown', [
                    animate('0.2s ease')
                ])
            ]),
            trigger('backdrop', [
                state('shown', style({ opacity: 1, display: 'block' })),
                state('hidden', style({ opacity: 0, display: 'none' })),
                transition('hidden <=> shown', [
                    animate('0.2s ease')
                ])
            ]),
            trigger('closeButton', [
                state('shown', style({ opacity: 1, display: 'block' })),
                state('hidden', style({ opacity: 0, display: 'none' })),
                transition('hidden <=> shown', [
                    animate('0.1s ease')
                ])
            ])
        ],
        host: { 'class': 'modal-placeholder' }
    }),
    __metadata("design:paramtypes", [ModalService, Injector])
], ModalPlaceholderComponent);
export { ModalPlaceholderComponent };
export var ModalSize;
(function (ModalSize) {
    ModalSize[ModalSize["Regular"] = 'regular'] = "Regular";
    ModalSize[ModalSize["Large"] = 'large'] = "Large";
    ModalSize[ModalSize["FullWidth"] = 'fullwidth'] = "FullWidth";
})(ModalSize || (ModalSize = {}));
//# sourceMappingURL=modal.component.js.map