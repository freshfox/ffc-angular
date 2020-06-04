import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {

	constructor(private snackBar: MatSnackBar) {
	}

	success(message: string, action?: string) {
		this.showNotification(message, {
			classes: 'ff-snack-bar-success'
		}, action);
	}

	error(message: string, action?: string) {
		this.showNotification(message, {
			classes: 'ff-snack-bar-error'
		}, action);
	}

	private showNotification(message: string, config?: NotificationConfig, action?: string) {
		return this.snackBar.open(message, action, {
			duration: 4000,
			horizontalPosition: 'left',
			verticalPosition: 'bottom',
			panelClass: [config.classes]
		});
	}

}

interface NotificationConfig {
	classes: string;
}
