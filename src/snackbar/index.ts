import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SnackbarService} from './snackbar.service';
import {MatSnackBarModule} from '@angular/material';

export * from './snackbar.service';

@NgModule({
	imports: [CommonModule, MatSnackBarModule],
	providers: [SnackbarService]
})
export class FFSnackbarModule {
}