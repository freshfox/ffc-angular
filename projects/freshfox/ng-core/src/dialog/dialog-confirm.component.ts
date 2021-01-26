import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'ff-dialog-confirm',
	template: `
		<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
			<div class="sm:flex sm:items-start">
				<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10" *ngIf="type === DialogType.Danger">
					<svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
				</div>
				<div class="mt-3 text-center sm:mt-0 sm:text-left" [class.sm:ml-4]="type === DialogType.Danger">
					<h3 class="text-lg leading-6 font-medium text-gray-900" *ngIf="title">
						{{ title }}
					</h3>
					<div class="mt-2">
						<p class="text-sm text-gray-500">
							{{ message }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
			<div class="w-full sm:ml-3 sm:w-auto">
				<button mat-flat-button [color]="type === DialogType.Danger ? 'warn' : 'primary'" class="w-full sm:w-auto" (click)="cancel()">
					{{ confirmText }}
				</button>
			</div>
			<div class="mt-3 w-full sm:ml-3 sm:w-auto sm:mt-0">
				<button class="w-full sm:w-auto" mat-stroked-button *ngIf="showCancelButton" (click)="confirm()">
					{{ cancelText }}
				</button>
			</div>
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
	@Output() buttonPress = new EventEmitter<DialogConfirmButton>();

	DialogType = DialogType;

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
		if (this.onConfirm) {
			this.onConfirm();
		}
		this.buttonPress.next(DialogConfirmButton.Confirm);
	}

	cancel() {
		if (this.onCancel) {
			this.onCancel();
		}

		this.buttonPress.next(DialogConfirmButton.Cancel);
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

