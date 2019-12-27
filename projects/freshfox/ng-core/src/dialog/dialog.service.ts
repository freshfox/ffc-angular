import {Injectable, TemplateRef} from '@angular/core';
import {ComponentType} from '@angular/cdk/portal';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';
import {DialogConfirmComponent, DialogType} from './dialog-confirm.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Injectable()
export class DialogService {

	private currentRef: DialogRef<any>;

	constructor(private dialog: MatDialog, private translate: TranslateService) {
	}

	createConfirmRequest(title: string, message: string, confirmText?: string, cancelText?: string, type?: DialogType): Observable<boolean> {
		return Observable.create(observer => {
			const ref = this.create(DialogConfirmComponent, {
				parameters: {
					title,
					message,
					confirmText,
					onConfirm: () => {
						ref.close();
						observer.next(true);
						observer.complete();
					},
					type
				},
				disableClose: true
			});

			ref.componentInstance.onCancel = () => {
				ref.close();
				observer.next(false);
				observer.complete();
			};
		});
	}

	createUnsavedChangesConfirmRequest(): Observable<boolean> {
		return this.createConfirmRequest(
			'You have unsaved changes.',
			this.translate.instant('general.confirm-unsaved-changes'),
			this.translate.instant('actions.ok')
		).pipe(first());
	}

	createAlertModal(title: string, message: string, type?: DialogType) {
		const ref = this.create(DialogConfirmComponent, {
			parameters: {
				title,
				message,
				confirmText: 'OK',
				showCancelButton: false,
				type
			}
		});

		ref.componentInstance.onConfirm = () => {
			ref.close();
		};

		return ref;
	}

	create<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, options: DialogOptions = {}) {
		if (!options.panelClass) {
			options.panelClass = [];
		}

		if (options.panelClass && typeof options.panelClass === 'string') {
			options.panelClass = [options.panelClass as string];
		}

		(options.panelClass as string[]).push('ff-dialog-no-padding');

		if (!options.width) {
			switch (options.size) {
				case DialogSize.Small:
					options.width = '250px';
					break;
				case DialogSize.Medium:
					options.width = '500px';
					break;
				case DialogSize.Large:
					options.width = '700px';
					break;
				default:
					options.width = '500px';
			}
		}

		if (options.parameters) {
			options.data = options.parameters;
		}

		const matRef = this.dialog.open(componentOrTemplateRef, options);
		const ref = new DialogRef<T>(matRef);

		this.currentRef = ref;

		// pass the @Input parameters to the instance
		if (matRef.componentInstance) {
			Object.assign(matRef.componentInstance, options.parameters);
		}

		return ref;
	}

}

export enum DialogSize {
	Small,
	Medium,
	Large
}

export interface DialogOptions extends MatDialogConfig {
	parameters?: object;
	size?: DialogSize;
}

export class DialogRef<T> {

	constructor(public matRef: MatDialogRef<T>) {
	}

	close() {
		this.matRef.close();
	}

	get componentInstance() {
		return this.matRef.componentInstance;
	}

}
