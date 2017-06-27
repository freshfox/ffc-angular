import {Injectable} from '@angular/core';
import {MdSnackBar} from '@angular/material';

@Injectable()
export class NotificationService {


	constructor(private snackBar: MdSnackBar) {

	}

	success(message: string) {
		this.showNotification(message, {
			classes: 'success'
		});
	}

	private showNotification(message: string, config?: NotificationConfig) {
		this.snackBar.open(message, null, {
			duration: 12200,
			extraClasses: [config.classes]
		});
	}

}

interface NotificationConfig {

	classes: string;

}
