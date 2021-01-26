import {CanDeactivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {DialogConfirmButton, DialogConfirmComponent, DialogService} from '../dialog/index';

export interface HasUnsaved {
	hasUnsaved(): boolean;
}

@Injectable()
export class CanDeactivateUnsavedService {

	constructor(private translate: TranslateService, private dialog: DialogService) {
	}

	openConfirmReloadNativeDialog(component: HasUnsaved, event) {
		if (component.hasUnsaved()) {
			event.preventDefault();
			const text = this.translate.instant('ff-can-deactivate-unsaved.text');
			return event.returnValue = confirm(text);
		}
		return true;
	}

	openConfirmUnsavedDialog(): Observable<boolean> {
		const ref = this.dialog.create<DialogConfirmComponent>(DialogConfirmComponent, {
			parameters: {
				title: this.translate.instant('ff-can-deactivate-unsaved.title'),
				message: this.translate.instant('ff-can-deactivate-unsaved.text'),
				confirmText: this.translate.instant('ff-can-deactivate-unsaved.confirm-text'),
			}
		});

		return ref.componentInstance.buttonPress
			.pipe(map((btn) => {
				ref.close();
				return btn === DialogConfirmButton.Confirm;
			}));
	}
}

@Injectable()
export class CanDeactivateUnsaved implements CanDeactivate<HasUnsaved> {

	constructor(private canDeactivateUnsavedService: CanDeactivateUnsavedService) {
	}

	canDeactivate(component: HasUnsaved): Observable<boolean> {
		if (!component.hasUnsaved) {
			console.error(`${component.constructor?.name} is required to implement the HasUnsaved interface`);
			return of(true);
		}
		const hasUnsavedData = component.hasUnsaved();
		if (!hasUnsavedData) {
			return of(true);
		}

		return this.canDeactivateUnsavedService.openConfirmUnsavedDialog();
	}
}
