import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import firebase from 'firebase/app';
import {map, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class AuthService {

	authState: Observable<firebase.User>;

	private firebaseAuth: firebase.auth.Auth;

	constructor(private angularFireAuth: AngularFireAuth) {
		this.firebaseAuth = firebase.auth();
		this.authState = this.angularFireAuth.authState;

		this.authState
			.pipe(switchMap(user => {
				if (user) {
					return fromPromise(user.getIdToken());
				}

				return of(null);
			}));
	}

	login(email: string, password: string): Observable<any> {
		return fromPromise(this.firebaseAuth.signInWithEmailAndPassword(email, password))
			.pipe(map(result => {
				return result;
			}));
	}

	logout(): Observable<any> {
		return fromPromise(this.firebaseAuth.signOut());
	}

	resetPassword(email: string) {
		return fromPromise(this.firebaseAuth.sendPasswordResetEmail(email));
	}

	confirmPasswordReset(token: string, newPassword: string) {
		return fromPromise(this.firebaseAuth.confirmPasswordReset(token, newPassword));
	}

	isLoggedIn(): Observable<boolean> {
		return this.authState.pipe(map(auth => !!auth));
	}

	getAuthToken(forceRefresh?: boolean): Observable<string> {
		return this.authState
			.pipe(switchMap(user => {
				return user.getIdToken(forceRefresh);
			}));
	}
}
