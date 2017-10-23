import {AfterViewInit, ComponentRef, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AnimationEvent} from '@angular/animations';
import {ModalSize, ModalService} from './modal.service';

export class ModalPlaceholderComponent implements OnInit, AfterViewInit {

	private isShown: boolean = false;
	private componentRef: ComponentRef<any>;
	padding: boolean = false;
	modalSize: ModalSize = ModalSize.Regular;
	clean: boolean = false;
	showCloseButton: boolean = true;

	@ViewChild('modalplaceholder', {read: ViewContainerRef}) viewContainerRef;

	constructor(private modalService: ModalService, private injector: Injector) {
	}

	get state(): string {
		return this.isShown ? 'shown' : 'hidden';
	}

	ngOnInit() {
		this.modalService.registerInjector(this.injector);
		this.modalService.registerPlaceholder(this);
	}

	ngAfterViewInit() {
		this.modalService.registerViewContainerRef(this.viewContainerRef);
	}

	registerComponentRef(componentRef: ComponentRef<any>) {
		this.componentRef = componentRef;
	}

	isLarge(): boolean {
		return this.modalSize == ModalSize.Large;
	}

	isFullWidth(): boolean {
		return this.modalSize == ModalSize.FullWidth;
	}

	isClean(): boolean {
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

	modalAnimationDone(event: AnimationEvent) {
		if (event.toState === 'hidden' && this.componentRef) {
			this.componentRef.destroy();
		}
	}

	private unlockBodyScroll() {
		this.removeClass(document.querySelector('body'), 'no-scroll');
	}

	private removeClass(element, clazz) {
		let newClassName = '';
		let i;
		let classes = element.className.split(' ');
		for (i = 0; i < classes.length; i++) {
			if (classes[i] !== clazz) {
				newClassName += classes[i] + ' ';
			}
		}
		element.className = newClassName;
	}

}
