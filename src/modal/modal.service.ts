import {Injectable, TemplateRef} from '@angular/core';
import {ModalConfirmComponent} from './modal-confirm.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ComponentType} from '@angular/cdk/portal';
import {MatDialogConfig} from '@angular/material/dialog/typings/dialog-config';

@Injectable()
export class ModalService {

	private currentRef: ModalRef<any>;

	constructor(private dialog: MatDialog) {
	}

	createConfirmRequest(title: string, message: string, onConfirm: Function, confirmText?: string, onCancel?: Function) {
		const ref = this.create(ModalConfirmComponent, {
			parameters: {
				title: title,
				message: message,
				confirmText: confirmText,
				onConfirm: onConfirm,
			}
		});

		ref.componentInstance.onCancel = () => {
			ref.close();
			if (onCancel) {
				onCancel();
			}
		};

		return ref;
	}

	create<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, options: ModalOptions = {}) {
		if (options.panelClass && options.panelClass.constructor !== Array) {
			options.panelClass = [options.panelClass as string];
		} else {
			options.panelClass = [];
		}

		if (!options.padding) {
			options.panelClass.push('ff-dialog-no-padding');
		}

		if (options.clean) {
			options.panelClass.push('ff-dialog-clean');
		}

		if (!options.width) {
			switch (options.size) {
				case ModalSize.Small:
					options.width = '250px';
					break;
				case ModalSize.Medium:
					options.width = '500px';
					break;
				case ModalSize.Large:
					options.width = '700px';
					break;
				default:
					options.width = '500px';
			}
		}

		const matRef = this.dialog.open(componentOrTemplateRef, options);
		const ref = new ModalRef<T>(matRef);

		this.currentRef = ref;

		// pass the @Input parameters to the instance
		Object.assign(matRef.componentInstance, options.parameters);

		return ref;
	}

}

export enum ModalSize {
	Small,
	Medium,
	Large
}

export interface ModalOptions extends MatDialogConfig {
	parameters?: Object;
	size?: ModalSize;
	clean?: boolean;
	padding?: boolean;
	showCloseButton?: boolean;
}

export class ModalRef<T> {

	constructor(private matRef: MatDialogRef<T>) {
	}

	close() {
		this.matRef.close();
	}

	get componentInstance() {
		return this.matRef.componentInstance;
	}

}
