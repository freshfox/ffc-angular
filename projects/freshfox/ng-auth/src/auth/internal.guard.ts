import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthService} from './auth.service';


@Injectable()
export class InternalGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {
	}

	canActivate() {
		return this.authService.isLoggedIn()
			.pipe(
				map((loggedIn) => {
					if (loggedIn) {
						return true;
					}

					this.router.navigate(['/login']);
					return false;
				}),
				catchError((error) => {
					this.router.navigate(['/login']);
					return of(false);
				})
			);
	}
}
