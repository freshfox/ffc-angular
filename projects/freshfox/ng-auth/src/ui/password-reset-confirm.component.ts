import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {formValidatorEqual, SnackBarService} from '@freshfox/ng-core';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'ff-password-reset-confirm',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form class="ff-auth__default-form" [formGroup]="form" (ngSubmit)="onSubmit()">
			<ng-container *ngIf="token$ | async">
				<h2 class="ff-auth__form-title text-white">{{ 'ff-auth.reset-confirm.title' | translate }}</h2>
				<ff-input type="password"
						  [placeholder]="'ff-auth.password' | translate"
						  [size]="'large'"
						  [formControl]="form.controls.password"></ff-input>

				<ff-input type="password"
						  [placeholder]="'ff-auth.password-confirm' | translate"
						  [size]="'large'"
						  [formControl]="form.controls.passwordConfirm"></ff-input>

				<button ff-button (click)="onSubmit()" type="submit" [loading]="loading$ | async">
					{{ 'ff-auth.reset-confirm.submit' | translate }}
				</button>
			</ng-container>
			<ng-container *ngIf="(token$ | async) === null">
				<ff-alert-bar [message]="'ff-auth.reset-confirm.missing-token' | translate"></ff-alert-bar>
			</ng-container>

			<div class="ff-auth__after-form">
				<a [routerLink]="['/login']" class="ff-auth__small-print">{{ 'ff-auth.back-to-login' | translate }}</a>
			</div>
		</form>
	`
})
export class PasswordResetConfirmComponent implements OnInit {

	form: FormGroup;
	loading$ = new BehaviorSubject(false);

	token$ = new BehaviorSubject<string>(null);

	constructor(private authService: AuthService,
				private snackbar: SnackBarService,
				private fb: FormBuilder,
				private route: ActivatedRoute,
				private router: Router,
				private translate: TranslateService) {
	}

	ngOnInit() {
		this.form = this.fb.group({
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		}, {validators: [formValidatorEqual]});

		this.route.queryParams
			.pipe(first())
			.subscribe(params => {
				if (params.oobCode) {
					this.token$.next(params.oobCode);
				}
			});
	}

	onSubmit() {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			this.loading$.next(true);
			this.authService.confirmPasswordReset(this.token$.value, this.form.value.password)
				.pipe(first())
				.subscribe(() => {
						this.loading$.next(false);
						this.snackbar.success(this.translate.instant('ff-auth.reset-confirm.success'));
						this.router.navigate(['/login']);
					},
					(error) => {
						let key = 'generic';
						switch (error.code) {
							case 'auth/expired-action-code':
								key = 'expired-action-code';
								break;
							case 'auth/invalid-action-code':
								key = 'invalid-action-code';
								break;
							case 'auth/user-disabled':
								key = 'user-disabled';
								break;
							case 'auth/user-not-found':
								key = 'user-not-found';
								break;
							case 'auth/weak-password':
								key = 'weak-password';
								break;
						}

						this.loading$.next(false);
						const errorMessage = this.translate.instant('ff-auth.reset-confirm.errors.' + key);
						this.snackbar.error(errorMessage);
					});
		}
	}
}
