import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {SnackBarService} from '@freshfox/ng-core';
import {BehaviorSubject} from 'rxjs';

@Component({
	selector: 'ff-password-reset',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <form class="ff-auth__default-form" [formGroup]="form" (ngSubmit)="onSubmit()">
			<ff-input type="email"
					  [placeholder]="'ff-auth.email' | translate"
					  [size]="'large'"
					  [formControl]="form.controls['email']"></ff-input>

			<button ff-button (click)="onSubmit()" type="submit" [loading]="loading$ | async">
				{{ 'ff-auth.reset.submit' | translate }}
			</button>

			<div class="ff-auth__after-form">
				<a [routerLink]="['/login']" class="ff-auth__small-print">{{ 'ff-auth.back-to-login' | translate }}</a>
			</div>
        </form>
	`
})
export class PasswordResetComponent implements OnInit {

	form: FormGroup;
	loading$ = new BehaviorSubject(false);

	constructor(private authService: AuthService,
				private snackbar: SnackBarService,
				private fb: FormBuilder,
				private translate: TranslateService) {
	}

	ngOnInit() {
		this.form = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])]
		});
	}

	onSubmit() {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			this.loading$.next(true);
			this.authService.resetPassword(this.form.value.email)
				.pipe(take(1))
				.subscribe(() => {
						this.loading$.next( false);
						this.snackbar.success(this.translate.instant('ff-auth.reset.success'));
					},
					() => {
						this.loading$.next( false);
						this.snackbar.error(this.translate.instant('ff-auth.reset.error'));
					});
		}
	}
}
