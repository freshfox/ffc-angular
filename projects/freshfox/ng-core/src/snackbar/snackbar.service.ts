import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {

	constructor(private snackBar: MatSnackBar) {
	}

	info(message: string, action?: string) {
		return this.showNotification(message, null, action);
	}

	success(message: string, action?: string) {
		return this.showNotification(message, {
			panelClass: ['ff-snack-bar-success']
		}, action);
	}

	error(message: string, action?: string) {
		return this.showNotification(message, {
			panelClass: ['ff-snack-bar-error']
		}, action);
	}

	private showNotification(message: string, config?: MatSnackBarConfig, action?: string) {
		return this.snackBar.open(message, action, config);
	}

}
