import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SnackBarService} from '../../../freshfox/ng-core/src/snackbar';
import {FormControl, Validators} from '@angular/forms';
import {NavGroup} from '../../../freshfox/ng-core/src/sidenav';

@Component({
	selector: 'app-root',
	template: `
		<mat-sidenav-container>
			<mat-sidenav [opened]="true" [mode]="'side'">
				<ff-sidenav [navGroups]="navGroups"
							[userName]="'Alexander Ott'"
							[userSubtitle]="'alex@freshfox.at'"
							[version]="'1.0.0'"></ff-sidenav>
			</mat-sidenav>
		</mat-sidenav-container>
	`,
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

	loading = false;

	control = new FormControl('', Validators.compose([Validators.required, Validators.email]))

	navGroups: NavGroup[] = [
		{
			title: 'Invoicing',
			items: [
				{
					icon: 'logout',
					path: 'path',
					titleKey: 'titlekey',
				}
			]
		},
		{
			title: 'Invoicing',
			items: [
				{
					icon: 'logout',
					path: 'path',
					titleKey: 'titlekey',
				}
			]
		},
		{
			title: 'Invoicing',
			items: [
				{
					icon: 'logout',
					path: 'path',
					titleKey: 'titlekey',
				}
			]
		}
	];

	constructor(private snackbar: SnackBarService) {

	}

	ngOnInit() {
		setInterval(() => {
			this.loading = !this.loading;
		}, 2000);
	}

	ngAfterViewInit() {
		// this.snackbar.error('test');
	}

	buttonClicked() {
		this.control.markAsTouched();
		this.control.markAsDirty();
		console.log(this.control.errors);
	}
}
