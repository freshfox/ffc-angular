import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SnackBarService} from '../../../freshfox/ng-core/src/snackbar';
import {FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'app-root',
	template: `
        <ff-input [(ngModel)]="value"></ff-input>

        <button ff-button [loading]="loading">Absenden</button>
	`,
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

	loading = false;

	value = 'heyho';

	control = new FormControl('heyho', Validators.required);

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
