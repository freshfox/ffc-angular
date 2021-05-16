import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SnackBarService} from '../../../freshfox/ng-core/src/snackbar';
import {FormControl, Validators} from '@angular/forms';
import {NavGroup} from '../../../freshfox/ng-core/src/sidenav';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';
import {DialogConfirmComponent, DialogService } from 'projects/freshfox/ng-core/src/dialog';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

import authEn from '../../../freshfox/ng-auth/src/i18n/en.json';

@Component({
	selector: 'app-root',
	template: `
		<!-- <mat-sidenav-container>
			<mat-sidenav [opened]="true" [mode]="'side'">
				<ff-sidenav [navGroups]="navGroups"
							[userName]="'Alexander Ott'"
							[userSubtitle]="'alex@freshfox.at'"
							[version]="'1.0.0'"></ff-sidenav>
			</mat-sidenav>

			<mat-card>
				<ff-badge [type]="'success'">
					Hello
				</ff-badge>
				<ff-select [label]="'Country'" [formControl]="control">
					<ff-option *ngFor="let food of foods$ | async" [value]="food.value">
						{{food.viewValue}}
					</ff-option>
				</ff-select>
			</mat-card>
		</mat-sidenav-container> -->

		<ff-public [routerMode]="false">
			<ff-login></ff-login>
		</ff-public>
	`,
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

	loading = false;

	control = new FormControl('steak-0', Validators.compose([Validators.required, Validators.email]));

	foods$ = of([
		{value: 'steak-0', viewValue: 'Steak'},
		{value: 'pizza@example.com', viewValue: 'Pizza'},
		{value: 'tacos-2', viewValue: 'Tacos'}
	]).pipe(delay(500));

	navGroups: NavGroup[] = [
		{
			title: 'Invoicing',
			items: [
				{
					icon: 'logout',
					path: 'path',
					titleKey: 'titlekey',
				},
				{
					icon: 'logout',
					path: 'path',
					titleKey: 'titlekey',
				},
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

	constructor(private snackbar: SnackBarService,
				private translate: TranslateService,
				private dialog: DialogService) {

		this.translate.setDefaultLang('en');
		this.translate.setTranslation('en', authEn);
	}

	ngOnInit() {
		setInterval(() => {
			this.loading = !this.loading;
		}, 2000);

		const ref = this.dialog.create(DialogConfirmComponent);
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
