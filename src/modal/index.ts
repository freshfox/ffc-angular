import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalService} from './modal.service';
import {ModalConfirmComponent} from './modal-confirm.component';
import {MatDialogModule} from '@angular/material';

export * from './modal.service';

@NgModule({
	imports: [CommonModule, MatDialogModule],
	declarations: [ModalConfirmComponent],
	entryComponents: [ModalConfirmComponent],
	exports: [ModalConfirmComponent],
	providers: [ModalService]
})
export class FFModalModule {
}