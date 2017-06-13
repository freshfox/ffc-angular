import { AfterViewInit, ComponentRef, Injector, OnInit } from "@angular/core";
import { AnimationEvent } from "@angular/animations";
import { ModalService } from "../services/modal.service";
export declare class ModalPlaceholderComponent implements OnInit, AfterViewInit {
    private modalService;
    private injector;
    private isShown;
    private componentRef;
    padding: boolean;
    modalSize: ModalSize;
    clean: boolean;
    showCloseButton: boolean;
    viewContainerRef: any;
    constructor(modalService: ModalService, injector: Injector);
    readonly state: string;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    registerComponentRef(componentRef: ComponentRef<any>): void;
    isLarge(): boolean;
    isFullWidth(): boolean;
    isClean(): boolean;
    onBackdropClicked(): void;
    show(): void;
    hide(): void;
    modalAnimationDone(event: AnimationEvent): void;
    private unlockBodyScroll();
    private removeClass(element, clazz);
}
export declare enum ModalSize {
    Regular,
    Large,
    FullWidth,
}
export interface ModalOptions {
    parameters?: Object;
    size?: ModalSize;
    clean?: boolean;
    padding?: boolean;
    showCloseButton?: boolean;
}
