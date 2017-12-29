import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalPlaceholderComponent} from './modal-placeholder.component';
import {ModalService} from './modal.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalConfirmComponent} from './modal-confirm.component';
import {FFIconModule} from '../icon';

export * from './modal-placeholder.component';
export * from './modal.service';

@NgModule({
	imports: [CommonModule, BrowserAnimationsModule, FFIconModule],
	declarations: [ModalPlaceholderComponent, ModalConfirmComponent],
	entryComponents: [ModalConfirmComponent],
	exports: [ModalPlaceholderComponent, ModalConfirmComponent],
	providers: [ModalService]
})
export class FFModalModule {
}