import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) {

	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return this.authService.getAuthToken()
			.pipe(switchMap(token => {
				if (!token) {
					return next.handle(req);
				}

				// Clone the request to add the new header.
				const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
				// Pass on the cloned request instead of the original request.
				return next.handle(authReq);
			}))
			.pipe(
				catchError(error => {
					console.log(error);
					if (error instanceof HttpErrorResponse) {
						switch ((error as HttpErrorResponse).status) {
							case 401:
								return this.authService.logout();
						}
					}

					return throwError(error);
				})
			);
	}

}
