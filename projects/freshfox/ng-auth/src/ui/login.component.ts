import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../auth/auth.service';
import {SnackBarService} from '@freshfox/ng-core';
import {BehaviorSubject} from 'rxjs';

@Component({
	selector: 'ff-login',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <form class="ff-auth__default-form" [formGroup]="form" (ngSubmit)="onSubmit()">
			<ff-input [placeholder]="'ff-auth.email' | translate"
					  [size]="'large'"
					  type="email"
					  [formControl]="form.controls.username"></ff-input>

			<ff-input [placeholder]="'ff-auth.password' | translate"
					  [size]="'large'"
					  [formControl]="form.controls.password"
					  type="password"></ff-input>

			<button ff-button (click)="onSubmit()" type="submit" [loading]="loading$ | async">
				{{ 'ff-auth.login.submit' | translate }}
			</button>

			<div class="ff-auth__after-form">
				<ng-content select="[after-form]"></ng-content>
				<a [routerLink]="['/password-reset']" class="ff-auth__small-print">{{ 'ff-auth.login.reset-password' | translate }}</a>
			</div>
        </form>
	`
})
export class LoginComponent implements OnInit {

	loading$ = new BehaviorSubject(false);
	form: FormGroup;

	@ViewChild('afterLogin', {static: true}) afterLogin: ViewContainerRef;

	constructor(private authService: AuthService,
				private router: Router,
				private fb: FormBuilder,
				private snackbarService: SnackBarService,
				private translate: TranslateService) {
	}

	ngOnInit() {
		this.form = this.fb.group({
			username: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.required],
		});
	}


	onSubmit() {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			const data = this.form.value;
			this.loading$.next(true);
			this.authService.login(data.username, data.password)
				.subscribe(
					() => {
						this.router.navigateByUrl('/');
					},
					error => {
						let alertMessage;
						switch (error.code) {
							case 'auth/network-request-failed':
								alertMessage = this.translate.instant('ff-auth.login.errors.network-request-failed');
								break;
							case 'auth/invalid-email':
								alertMessage = this.translate.instant('ff-auth.login.errors.invalid-email');
								break;
							case 'auth/user-not-found':
								alertMessage = this.translate.instant('ff-auth.login.errors.user-not-found');
								break;
							case 'auth/wrong-password':
								alertMessage = this.translate.instant('ff-auth.login.errors.wrong-password');
								break;
							case 'auth/too-many-requests':
								alertMessage = this.translate.instant('ff-auth.login.errors.too-many-attempts');
								break;
						}

						this.snackbarService.error(alertMessage);
						this.loading$.next(false);
					}
				);
		}
	}
}
