import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SnackBarService} from '../../../freshfox/ng-core/src/snackbar';

@Component({
	selector: 'app-root',
	template: `
		<ff-input></ff-input>
        <button ff-button [loading]="loading">Absenden</button>
	`,
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

	loading = false;

	constructor(private snackbar: SnackBarService) {

	}

	ngOnInit() {
		setInterval(() => {
			this.loading = !this.loading;
		}, 2000);
	}

	ngAfterViewInit() {
		this.snackbar.error('test');
	}
}
