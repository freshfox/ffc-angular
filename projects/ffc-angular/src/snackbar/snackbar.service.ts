import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {

	constructor(private snackBar: MatSnackBar) {
	}

	success(message: string) {
		this.showNotification(message, {
			classes: 'ff-snack-bar-success'
		});
	}

	error(message: string) {
		this.showNotification(message, {
			classes: 'ff-snack-bar-error'
		});
	}

	private showNotification(message: string, config?: NotificationConfig) {
		this.snackBar.open(message, null, {
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
