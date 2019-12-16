import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class PublicGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {
	}

	canActivate() {
		return this.authService.isLoggedIn()
			.pipe(
				map((loggedIn) => {
					if (loggedIn) {
						this.router.navigate(['/']);
						return false;
					}

					return true;
				}),
				catchError(err => {
					return of(true);
				})
			);
	}

}
