import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogConfirmComponent} from './dialog-confirm.component';
import {DialogService} from './dialog.service';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';

export * from './dialog-confirm.component';
export * from './dialog.service';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
	],
	exports: [DialogConfirmComponent],
	declarations: [DialogConfirmComponent],
	providers: [
		DialogService,
	],
})
export class FFDialogModule {
}
