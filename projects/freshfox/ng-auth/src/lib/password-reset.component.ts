import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {SnackBarService} from '@freshfox/ng-core';

@Component({
	selector: 'ff-password-reset',
	template: `
        <form class="form-stacked default-form-wrapper login-form" [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-card>
                <ff-input type="email" [placeholder]="'general.email' | translate"
                          [formControl]="form.controls['email']"></ff-input>

                <button mat-flat-button color="primary" (click)="onSubmit()" type="submit" [disabled]="loading">
                    <span *ngIf="!loading">{{ 'login.forgot-password-submit' | translate }}</span>
                    <span *ngIf="loading">{{ 'login.forgot-password-submitting' | translate }}</span>
                </button>
            </mat-card>
        </form>

        <div class="after-form">
            <a [routerLink]="['/login']" class="small-print">{{ 'login.back-to-login' | translate }}</a>
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
