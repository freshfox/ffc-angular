import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdSnackBarModule} from '@angular/material';
import {SnackbarService} from './snackbar.service';

export * from './snackbar.service';

@NgModule({
	imports: [CommonModule, MdSnackBarModule],
	providers: [SnackbarService]
})
export class FFSnackbarModule {
}