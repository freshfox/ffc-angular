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
var animations_1 = require("@angular/animations");
var modal_service_1 = require("../services/modal.service");
var ModalPlaceholderComponent = (function () {
    function ModalPlaceholderComponent(modalService, injector) {
        this.modalService = modalService;
        this.injector = injector;
        this.isShown = false;
        this.padding = false;
        this.modalSize = ModalSize.Regular;
        this.clean = false;
        this.showCloseButton = true;
    }
    Object.defineProperty(ModalPlaceholderComponent.prototype, "state", {
        get: function () {
            return this.isShown ? 'shown' : 'hidden';
        },
        enumerable: true,
        configurable: true
    });
    ModalPlaceholderComponent.prototype.ngOnInit = function () {
        this.modalService.registerInjector(this.injector);
        this.modalService.registerPlaceholder(this);
    };
    ModalPlaceholderComponent.prototype.ngAfterViewInit = function () {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
    };
    ModalPlaceholderComponent.prototype.registerComponentRef = function (componentRef) {
        this.componentRef = componentRef;
    };
    ModalPlaceholderComponent.prototype.isLarge = function () {
        return this.modalSize == ModalSize.Large;
    };
    ModalPlaceholderComponent.prototype.isFullWidth = function () {
        return this.modalSize == ModalSize.FullWidth;
    };
    ModalPlaceholderComponent.prototype.isClean = function () {
        return this.clean;
    };
    ModalPlaceholderComponent.prototype.onBackdropClicked = function () {
        this.hide();
    };
    ModalPlaceholderComponent.prototype.show = function () {
        this.isShown = true;
        var body = document.querySelector('body');
        body.className += ' no-scroll';
    };
    ModalPlaceholderComponent.prototype.hide = function () {
        this.isShown = false;
        this.unlockBodyScroll();
    };
    ModalPlaceholderComponent.prototype.modalAnimationDone = function (event) {
        if (event.toState === 'hidden' && this.componentRef) {
            this.componentRef.destroy();
        }
    };
    ModalPlaceholderComponent.prototype.unlockBodyScroll = function () {
        this.removeClass(document.querySelector('body'), 'no-scroll');
    };
    ModalPlaceholderComponent.prototype.removeClass = function (element, clazz) {
        var newClassName = "";
        var i;
        var classes = element.className.split(" ");
        for (i = 0; i < classes.length; i++) {
            if (classes[i] !== clazz) {
                newClassName += classes[i] + " ";
            }
        }
        element.className = newClassName;
    };
    return ModalPlaceholderComponent;
}());
__decorate([
    core_1.ViewChild("modalplaceholder", { read: core_1.ViewContainerRef }),
    __metadata("design:type", Object)
], ModalPlaceholderComponent.prototype, "viewContainerRef", void 0);
ModalPlaceholderComponent = __decorate([
    core_1.Component({
        selector: "ff-modal-placeholder",
        template: "\n        <div class=\"modal-outer\" [@modalOuter]=\"state\">\n            <div [@modal]=\"state\" (@modal.done)=\"modalAnimationDone($event)\" tabindex=\"1\" class=\"modal\"\n                 [class.modal--no-padding]=\"!padding\"\n                 [class.modal--large]=\"isLarge()\"\n                 [class.modal--full-width]=\"isFullWidth()\"\n                 [class.modal--clean]=\"isClean()\">\n                <div class=\"modal-dialog\">\n                    <div class=\"modal-dialog__inner\">\n                        <ng-template #modalplaceholder></ng-template>\n                        <nvry-button *ngIf=\"showCloseButton && !clean\" class=\"button--clear modal__close-button-inside\"\n                                     (click)=\"hide()\">\n                            <nvry-icon name=\"cross\"></nvry-icon>\n                        </nvry-button>\n                    </div>\n                </div>\n            </div>\n            <div [@backdrop]=\"state\" class=\"modal-backdrop\" (click)=\"onBackdropClicked()\"></div>\n            <button ff-button *ngIf=\"showCloseButton && clean\" class=\"modal__close-button\" [@closeButton]=\"state\"\n                         (click)=\"hide()\">\n                <ff-icon name=\"cross\"></ff-icon>\n            </button>\n        </div>\n    ",
        animations: [
            animations_1.trigger('modalOuter', [
                animations_1.state('shown', animations_1.style({ display: 'flex' })),
                animations_1.state('hidden', animations_1.style({ display: 'none' })),
                animations_1.transition('hidden <=> shown', [
                    animations_1.animate('0.2s ease')
                ])
            ]),
            animations_1.trigger('modal', [
                animations_1.state('shown', animations_1.style({ transform: 'scale3d(1, 1, 1)', opacity: 1, display: 'block' })),
                animations_1.state('hidden', animations_1.style({ transform: 'scale3d(0.7, 0.7, 0.7)', opacity: 0 })),
                animations_1.transition('hidden <=> shown', [
                    animations_1.animate('0.2s ease')
                ])
            ]),
            animations_1.trigger('backdrop', [
                animations_1.state('shown', animations_1.style({ opacity: 1, display: 'block' })),
                animations_1.state('hidden', animations_1.style({ opacity: 0, display: 'none' })),
                animations_1.transition('hidden <=> shown', [
                    animations_1.animate('0.2s ease')
                ])
            ]),
            animations_1.trigger('closeButton', [
                animations_1.state('shown', animations_1.style({ opacity: 1, display: 'block' })),
                animations_1.state('hidden', animations_1.style({ opacity: 0, display: 'none' })),
                animations_1.transition('hidden <=> shown', [
                    animations_1.animate('0.1s ease')
                ])
            ])
        ],
        host: { 'class': 'modal-placeholder' }
    }),
    __metadata("design:paramtypes", [modal_service_1.ModalService, core_1.Injector])
], ModalPlaceholderComponent);
exports.ModalPlaceholderComponent = ModalPlaceholderComponent;
var ModalSize;
(function (ModalSize) {
    ModalSize[ModalSize["Regular"] = 'regular'] = "Regular";
    ModalSize[ModalSize["Large"] = 'large'] = "Large";
    ModalSize[ModalSize["FullWidth"] = 'fullwidth'] = "FullWidth";
})(ModalSize = exports.ModalSize || (exports.ModalSize = {}));
var ModalOptions = (function () {
    function ModalOptions() {
    }
    return ModalOptions;
}());
exports.ModalOptions = ModalOptions;
//# sourceMappingURL=modal.component.js.map