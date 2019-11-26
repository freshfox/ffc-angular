import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import * as firebase from 'firebase/app';
import {map, switchMap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {fromPromise} from 'rxjs/internal-compatibility';


@Injectable()
export class AuthService {

	authState: Observable<firebase.User>;
	private authToken: string;

	constructor(private firebaseAuth: AngularFireAuth) {
		this.authState = this.firebaseAuth.authState;

		this.authState
			.pipe(switchMap(user => {
				if (user) {
					return fromPromise(user.getIdToken());
				}

				return of(null);
			}))
			.subscribe(token => {
				this.authToken = token;
			});
	}

	login(email: string, password: string): Observable<any> {
		return fromPromise(this.firebaseAuth.auth.signInWithEmailAndPassword(email, password))
			.pipe(map(result => {
				return result;
			}));
	}

	logout(): Observable<any> {
		return fromPromise(this.firebaseAuth.auth.signOut());
	}

	resetPassword(email: string) {
		return fromPromise(this.firebaseAuth.auth.sendPasswordResetEmail(email));
	}

	isLoggedIn(): Observable<boolean> {
		return this.authState.pipe(map(auth => !!auth));
	}

	getAuthToken(): string {
		return this.authToken;
	}
}
