import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../auth/auth.service';
import {SnackBarService} from '@freshfox/ng-core';

@Component({
	selector: 'ff-login',
	template: `
        <form class="form-stacked default-form-wrapper login-form" [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-card>
                <ff-input [label]="'general.username' | translate"
                          [size]="'large'"
						  type="email"
                          [formControl]="form.controls.username"></ff-input>

                <ff-input [label]="'general.password' | translate"
                          [size]="'large'"
                          [formControl]="form.controls.password"
                          type="password"></ff-input>

                <button mat-flat-button color="primary" (click)="onSubmit()" type="submit" [disabled]="loading">
                    <span *ngIf="!loading">{{ 'login.submit' | translate }}</span>
                    <span *ngIf="loading">{{ 'login.submitting' | translate }}</span>
                </button>
            </mat-card>
        </form>

        <div class="after-form">
            <a [routerLink]="['/password-reset']" class="small-print">{{ 'login.reset-password' | translate }}</a>
        </div>
	`
})
export class LoginComponent implements OnInit {

	loading = false;
	form: FormGroup;

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
			this.loading = true;
			this.authService.login(data.username, data.password)
				.subscribe(
					() => {
						console.log('Login Successful');
						this.router.navigateByUrl('/');
					},
					error => {
						let alertMessage;
						console.log('Login Error: ' + error.code);
						switch (error.code) {
							case 'auth/network-request-failed':
								alertMessage = this.translate.instant('login.error-network-request-failed');
								break;
							case 'auth/invalid-email':
								alertMessage = this.translate.instant('login.error-invalid-email');
								break;
							case 'auth/user-not-found':
								alertMessage = this.translate.instant('login.error-user-not-found');
								break;
							case 'auth/wrong-password':
								alertMessage = this.translate.instant('login.error-wrong-password');
								break;
							case 'auth/too-many-requests':
								alertMessage = this.translate.instant('login.error-too-many-attempts');
								break;
						}

						this.snackbarService.error(alertMessage);
						this.loading = false;
					}
				);
		}
	}
}
