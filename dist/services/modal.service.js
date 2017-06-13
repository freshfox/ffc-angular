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
var confirm_component_1 = require("../components/confirm.component");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var modal_component_1 = require("../components/modal.component");
var ModalService = (function () {
    function ModalService(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.activeInstances = 0;
    }
    ModalService.prototype.hideCurrentModal = function () {
        this.placeholder.hide();
    };
    ModalService.prototype.registerViewContainerRef = function (vcRef) {
        this.vcRef = vcRef;
    };
    ModalService.prototype.registerPlaceholder = function (placeholder) {
        this.placeholder = placeholder;
    };
    ModalService.prototype.registerInjector = function (injector) {
        this.injector = injector;
    };
    ModalService.prototype.createConfirmRequest = function (title, message, onCancel, onConfirm) {
        this.create(confirm_component_1.ConfirmComponent, {
            parameters: {
                title: title,
                message: message,
                onCancel: onCancel,
                onConfirm: onConfirm
            }
        });
    };
    ModalService.prototype.create = function (component, options) {
        options = Object.assign({}, {
            size: modal_component_1.ModalSize.Regular,
            padding: false,
            clean: false,
            showCloseButton: true
        }, options);
        var factory = this.componentFactoryResolver.resolveComponentFactory(component);
        return this.createFromFactory(factory, options);
    };
    ModalService.prototype.createFromFactory = function (componentFactory, options) {
        this.placeholder.show();
        var componentRef$ = new ReplaySubject_1.ReplaySubject();
        var childInjector = core_1.ReflectiveInjector.resolveAndCreate([], this.injector);
        var componentRef = this.vcRef.createComponent(componentFactory, 0, childInjector);
        // pass the @Input parameters to the instance
        Object.assign(componentRef.instance, options.parameters);
        this.placeholder.padding = options.padding;
        this.placeholder.modalSize = options.size;
        this.placeholder.clean = options.clean;
        this.placeholder.showCloseButton = options.showCloseButton;
        this.placeholder.registerComponentRef(componentRef);
        componentRef$.next(componentRef);
        componentRef$.complete();
        return componentRef$.asObservable();
    };
    return ModalService;
}());
ModalService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
], ModalService);
exports.ModalService = ModalService;
//# sourceMappingURL=modal.service.js.map