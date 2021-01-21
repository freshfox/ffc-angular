import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/auth';
import {map, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';


@Injectable()
export class AuthService {

	authState = new ReplaySubject<firebase.User | null>(1);

	private auth: firebase.auth.Auth;

	constructor() {

		this.auth = firebase.auth();

		firebase.auth().onAuthStateChanged(user => {
			this.authState.next(user || null);
		});
	}

	login(email: string, password: string): Observable<any> {
		return fromPromise(this.auth.signInWithEmailAndPassword(email, password))
			.pipe(map(result => {
				return result;
			}));
	}

	logout(): Observable<any> {
		return fromPromise(this.auth.signOut());
	}

	resetPassword(email: string) {
		return fromPromise(this.auth.sendPasswordResetEmail(email));
	}

	confirmPasswordReset(token: string, newPassword: string) {
		return fromPromise(this.auth.confirmPasswordReset(token, newPassword));
	}

	isLoggedIn(): Observable<boolean> {
		return this.authState.pipe(map(auth => !!auth));
	}

	getAuthToken(forceRefresh?: boolean): Observable<string> {
		return this.authState
			.pipe(switchMap(user => {
				return user?.getIdToken(forceRefresh) || of(null);
			}));
	}
}
