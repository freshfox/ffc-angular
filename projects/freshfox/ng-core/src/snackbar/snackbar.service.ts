import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {

	constructor(private snackBar: MatSnackBar) {
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

	private showNotification(message: string, config?: MatSnackBarConfig, action?: string): MatSnackBarRef<any> {
		return this.snackBar.open(message, action, config);
	}

}
