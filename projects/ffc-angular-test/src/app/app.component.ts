import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SnackBarService} from '../../../freshfox/ng-core/src/snackbar';
import {FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'app-root',
	template: `
        <ff-input [formControl]="control"></ff-input>

		<pre>
		{{ control.touched }}
		</pre>

        <button ff-button (click)="buttonClicked()">Absenden</button>
	`,
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

	loading = false;

	control = new FormControl('', Validators.compose([Validators.required, Validators.email]));

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

	buttonClicked() {
		this.control.markAsTouched();
		this.control.markAsDirty();
		console.log(this.control.errors);
	}
}
