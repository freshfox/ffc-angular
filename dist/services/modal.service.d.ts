import { ComponentFactoryResolver, ComponentRef, Injector, ViewContainerRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ModalOptions, ModalPlaceholderComponent } from "../components/modal.component";
export declare class ModalService {
    private componentFactoryResolver;
    private vcRef;
    private injector;
    activeInstances: number;
    private placeholder;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    hideCurrentModal(): void;
    registerViewContainerRef(vcRef: ViewContainerRef): void;
    registerPlaceholder(placeholder: ModalPlaceholderComponent): void;
    registerInjector(injector: Injector): void;
    createConfirmRequest(title: string, message: string, onCancel: Function, onConfirm: Function): void;
    create<T>(component: any, options?: ModalOptions): Observable<ComponentRef<T>>;
    private createFromFactory<T>(componentFactory, options);
}
