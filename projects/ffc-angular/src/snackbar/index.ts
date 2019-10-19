import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SnackBarService} from './snackbar.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export * from './snackbar.service';

@NgModule({
	imports: [CommonModule, MatSnackBarModule],
	providers: [SnackBarService]
})
export class FFSnackbarModule {
}
