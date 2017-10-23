import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackbarService {


	constructor(private snackBar: MatSnackBar) {

	}

	success(message: string) {
		this.showNotification(message, {
			classes: 'success'
		});
	}

	error(message: string) {
		this.showNotification(message, {
			classes: 'error'
		});
	}

	private showNotification(message: string, config?: NotificationConfig) {
		this.snackBar.open(message, null, {
			duration: 4000,
			extraClasses: [config.classes]
		});
	}

}

interface NotificationConfig {

	classes: string;

}
