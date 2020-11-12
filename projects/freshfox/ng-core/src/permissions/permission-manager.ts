import {Injectable, InjectionToken, Injector} from '@angular/core';
import {combineLatest, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {CanActivate, Route} from '@angular/router';

export enum PermissionMode {
	READ = 1,
	WRITE = 2
}

export interface Permission<T = string> {
	id: T;
	level: PermissionMode;
}

export class PermissionState<T = string> {
	permissions$: Observable<Permission<T>[]>;
}

@Injectable()
export class PermissionManager<T = string> {

	constructor(private state: PermissionState<T>) {
	}

	canRead(type: T): Observable<boolean> {
		return this.getPermissionLevelForType(type)
			.pipe(map(level => {
				return level ? level >= PermissionMode.READ : false;
			}));
	}

	canWrite(type: T): Observable<boolean> {
		return this.getPermissionLevelForType(type)
			.pipe(map(level => {
				return level ? level >= PermissionMode.WRITE : false;
			}));
	}

	canReadSome(types: T[]) {
		return combineLatest(types.map((perm) => {
			return this.canRead(perm);
		}))
			.pipe(map((canReadArray) => {
				return canReadArray.some(c => c);
			}));
	}

	private getPermissionLevelForType(type: T) {
		return this.getPermissions()
			.pipe(map(permissions => {
				const permission = permissions.find(p => p.id === type);
				return permission ? permission.level : null;
			}));
	}

	private getPermissions(): Observable<Permission<T>[]> {
		return this.state.permissions$;
	}
}

export type PermissionCheckerFactory = (type: string) => PermissionChecker;

export const PERMISSION_CHECKER_TOKEN = new InjectionToken<PermissionCheckerFactory>('PermissionCheckerFactory');

export class PermissionChecker {

	constructor(private manager: PermissionManager, private type: string) {

	}

	canRead() {
		return this.manager.canRead(this.type);
	}

	canWrite() {
		return this.manager.canWrite(this.type);
	}
}

@Injectable()
export abstract class BasePermissionGuard<T> implements CanActivate {

	constructor(private manager: PermissionManager<T>) {
	}

	abstract getPermissions(): Permission<T>[] | Observable<Permission<T>[]>;

	canActivate() {
		let permissions = this.getPermissions();
		if (Array.isArray(permissions)) {
			permissions = of(permissions);
		}

		return permissions
			.pipe(switchMap(perms => {
				return canReadPermissions(this.manager, perms);
			}));
	}
}

export function canReadPermissions<T>(manager: PermissionManager<T>, permissions: Permission<T>[]) {
	return combineLatest(permissions.map((perm) => {
		return manager.canRead(perm.id);
	}))
		.pipe(map((canReadArray) => {
			if (canReadArray.some(c => c)) {
				return true;
			}
		}));
}

export function canRouteBeActivated(route: Route, injector: Injector) {
	if (!(route.path && route.path.indexOf(':') < 0)) {
		return of(false);
	}
	if (!route.canActivate) {
		return of(true);
	}
	return combineLatest(
		route.canActivate.map((guard) => {
			const g = injector.get(guard);
			if (typeof g === 'function') {
				return g();
			} else {
				return (g as CanActivate).canActivate(null, null);
			}
		})
	)
		.pipe(map((canActivateArray) => {
			return canActivateArray.every(a => a);
		}));
}

