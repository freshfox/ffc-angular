var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ComponentFactoryResolver, Injectable, ReflectiveInjector } from "@angular/core";
import { ConfirmComponent } from "../components/confirm.component";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ModalSize } from "../components/modal.component";
let ModalService = class ModalService {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.activeInstances = 0;
    }
    hideCurrentModal() {
        this.placeholder.hide();
    }
    registerViewContainerRef(vcRef) {
        this.vcRef = vcRef;
    }
    registerPlaceholder(placeholder) {
        this.placeholder = placeholder;
    }
    registerInjector(injector) {
        this.injector = injector;
    }
    createConfirmRequest(title, message, onCancel, onConfirm) {
        this.create(ConfirmComponent, {
            parameters: {
                title: title,
                message: message,
                onCancel: onCancel,
                onConfirm: onConfirm
            }
        });
    }
    create(component, options) {
        options = Object.assign({}, {
            size: ModalSize.Regular,
            padding: false,
            clean: false,
            showCloseButton: true
        }, options);
        let factory = this.componentFactoryResolver.resolveComponentFactory(component);
        return this.createFromFactory(factory, options);
    }
    createFromFactory(componentFactory, options) {
        this.placeholder.show();
        let componentRef$ = new ReplaySubject();
        const childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
        let componentRef = this.vcRef.createComponent(componentFactory, 0, childInjector);
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
    }
};
ModalService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ComponentFactoryResolver])
], ModalService);
export { ModalService };
//# sourceMappingURL=modal.service.js.map