import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'ff-dialog-confirm',
	template: `
		<div class="ff-dialog-header" [class.ff-dialog-header--danger]="isDanger" *ngIf="title">
			{{ title }}
		</div>

		<div class="ff-dialog-content">
			<p class="nmb">{{ message }}</p>
		</div>

		<div class="ff-dialog-footer">
			<button mat-flat-button (click)="cancel()" *ngIf="showCancelButton">
				{{ cancelText }}
			</button>
			<button mat-flat-button color="primary" (click)="confirm()">{{ confirmText }}</button>
		</div>
	`
})
export class DialogConfirmComponent implements OnInit {

	@Input() title: string;
	@Input() message: string;
	@Input() confirmText: string;
	@Input() cancelText: string;
	@Input() showCancelButton = true;
	@Input() type = DialogType.Default;

	@Output() onCancel: () => void;
	@Output() onConfirm: () => void;
	@Output() buttonPress: EventEmitter<DialogConfirmButton> = new EventEmitter<DialogConfirmButton>();

	constructor(private translate: TranslateService) {
	}

	ngOnInit() {
		if (!this.confirmText) {
			this.confirmText = this.translate.instant('actions.delete');
		}

		if (!this.cancelText) {
			this.cancelText = this.translate.instant('actions.cancel');
		}
	}

	confirm() {
		this.onConfirm();
	}

	cancel() {
		this.onCancel();
	}

	get isDanger() {
		return this.type === 'danger';
	}

}

export enum DialogConfirmButton {
	Cancel = 'cancel',
	Confirm = 'confirm',
}

export enum DialogType {
	Default = 'default',
	Danger = 'danger'
}

