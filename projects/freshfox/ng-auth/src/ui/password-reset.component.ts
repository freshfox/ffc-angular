import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {SnackBarService} from '@freshfox/ng-core';

@Component({
	selector: 'ff-password-reset',
	template: `
        <form class="ff-auth__default-form" [formGroup]="form" (ngSubmit)="onSubmit()">
			<ff-input type="email"
					  [placeholder]="'general.email' | translate"
					  [size]="'large'"
					  [formControl]="form.controls['email']"></ff-input>

			<button ff-button (click)="onSubmit()" type="submit" [loading]="loading">
				{{ 'login.forgot-password-submit' | translate }}
			</button>
        </form>

        <div class="ff-auth__after-form">
            <a [routerLink]="['/login']" class="ff-auth__small-print">{{ 'login.back-to-login' | translate }}</a>
        </div>
	`
})
export class PasswordResetComponent implements OnInit {

	form: FormGroup;
	loading = false;

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
			this.loading = true;
			this.authService.resetPassword(this.form.value.email)
				.pipe(take(1))
				.subscribe(() => {
						this.loading = false;
						this.snackbar.success(this.translate.instant('login.forgot-password-success'));
					},
					() => {
						this.loading = false;
						this.snackbar.error(this.translate.instant('login.forgot-password-error'));
					});
		}
	}
}
