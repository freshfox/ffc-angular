import {
	ComponentFactory,
	ComponentFactoryResolver,
	ComponentRef,
	Injectable,
	Injector,
	ReflectiveInjector,
	ViewContainerRef
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ModalPlaceholderComponent} from './modal-placeholder.component';
import {ModalConfirmComponent} from './modal-confirm.component';

@Injectable()
export class ModalService {
	private vcRef: ViewContainerRef;
	private injector: Injector;
	public activeInstances: number = 0;

	private placeholder: ModalPlaceholderComponent;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
	}

	hideCurrentModal() {
		this.placeholder.hide();
	}

	registerViewContainerRef(vcRef: ViewContainerRef): void {
		this.vcRef = vcRef;
	}

	registerPlaceholder(placeholder: ModalPlaceholderComponent) {
		this.placeholder = placeholder;
	}

	registerInjector(injector: Injector): void {
		this.injector = injector;
	}

	createConfirmRequest(title: string, message: string, onCancel: Function, onConfirm: Function, confirmText?: string) {
		this.create(ModalConfirmComponent, {
			parameters: {
				title: title,
				message: message,
				confirmText: confirmText,
				onCancel: onCancel,
				onConfirm: onConfirm,
			}
		});
	}

	create<T>(component: any, options?: ModalOptions): Observable<ComponentRef<T>> {
		options = Object.assign({}, {
			size: ModalSize.Regular,
			padding: false,
			clean: false,
			showCloseButton: true
		}, options);

		let factory = this.componentFactoryResolver.resolveComponentFactory(component);
		return this.createFromFactory(factory, options) as Observable<ComponentRef<T>>;
	}

	private createFromFactory<T>(componentFactory: ComponentFactory<T>, options: ModalOptions): Observable<ComponentRef<T>> {
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
		return componentRef$.asObservable() as Observable<ComponentRef<T>>;
	}
}

export enum ModalSize {
	Regular = 'regular' as any,
	Large = 'large' as any,
	FullWidth = 'fullwidth' as any,
}

export interface ModalOptions {
	parameters?: Object;
	size?: ModalSize;
	clean?: boolean;
	padding?: boolean;
	showCloseButton?: boolean;
}

