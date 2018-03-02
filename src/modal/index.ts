import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalService} from './modal.service';
import {ModalConfirmComponent} from './modal-confirm.component';
import {MatDialogModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

export * from './modal.service';

@NgModule({
	imports: [CommonModule, MatDialogModule, TranslateModule],
	declarations: [ModalConfirmComponent],
	entryComponents: [ModalConfirmComponent],
	exports: [ModalConfirmComponent],
	providers: [ModalService]
})
export class FFModalModule {
}