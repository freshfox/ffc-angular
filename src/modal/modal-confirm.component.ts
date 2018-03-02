import {Component, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'ff-modal-confirm',
	template: `
        <div class="modal-header" *ngIf="title">
            {{ title }}
        </div>

        <div class="modal-content">
            <p class="nmb">{{ message }}</p>
        </div>

        <div class="modal-footer">
            <button ff-button class="ff-button--secondary" (click)="cancel()">{{ 'general.cancel' | translate }}</button>
            <button ff-button (click)="confirm()">{{ confirmText }}</button>
        </div>
	`
})
export class ModalConfirmComponent implements OnInit {

	@Input() title: string;
	@Input() message: string;
	@Input() confirmText: string;

	@Output() onCancel: Function;
	@Output() onConfirm: Function;

	constructor(private translate: TranslateService) {
	}

	ngOnInit() {
		if (!this.confirmText) {
			this.confirmText = this.translate.instant('actions.delete');
		}
	}

	confirm() {
		this.onConfirm();
	}

	cancel() {
		this.onCancel();
	}

}
