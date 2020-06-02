import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {combineLatest, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
	selector: 'ff-sidenav',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="ff-sidenav__top" [class.ff-sidenav__top--electron]="electronMode">
			<img src="assets/images/logo-sidenav.svg" class="ff-sidenav__logo">
			<div class="ff-sidenav__top-right">
				<div class="ff-sidenav__version" *ngIf="version">{{ version }}</div>
				<div class="ff-sidenav__changelog" (click)="changelogClick.emit()" *ngIf="showChangelog">
					Changelog
				</div>
			</div>
		</div>

		<nav>
			<ng-container *ngFor="let group of navGroups">
				<div *ngIf="canActivateGroup(group) | async" class="ff-sidenav__group">
					<h3 class="ff-sidenav__group-title" *ngIf="group.title">{{ group.title }}</h3>
					<div class="ff-sidenav__group-items">
						<ng-container *ngFor="let item of group.items">
							<a [routerLink]="[item.path]" class="ff-sidenav__item"
							   routerLinkActive="ff-sidenav__item--active"
							   *ngIf="item.canActivate$ ? (item.canActivate$ | async) : true">
								<div class="ff-sidenav__item-inner">
									<mat-icon [svgIcon]="item.svgIcon" *ngIf="item.svgIcon"></mat-icon>
									<mat-icon *ngIf="item.icon">{{ item.icon }}</mat-icon>
									<span class="ff-sidenav-item__text">{{ item.titleKey | translate }}</span>
								</div>
							</a>
						</ng-container>
					</div>
				</div>
			</ng-container>

			<div class="ff-sidenav__bottom">
				<div class="ff-sidenav__user">
					<ff-avatar [imageUrl]="userAvatarUrl" [userName]="userName" [userHashBase]="userSubtitle"></ff-avatar>

					<div>
						<span class="ff-sidenav__user-name" *ngIf="userName">{{ userName }}</span>
						<span class="ff-sidenav__user-email" *ngIf="userSubtitle">{{ userSubtitle }}</span>
					</div>
				</div>

				<button (click)="logoutClick.emit()" class="ff-sidenav__item">
					<div class="ff-sidenav__item-inner">
						<mat-icon>logout</mat-icon>
						<span class="ff-sidenav-item__text">{{ 'general.logout' | translate }}</span>
					</div>
				</button>
			</div>
		</nav>
	`
})
export class SidenavComponent implements OnInit {

	@HostBinding('class') clazz = 'ff-sidenav';

	@Input() electronMode = false;
	@Input() version: string;
	@Input() showChangelog = false;
	@Input() userName: string;
	@Input() userSubtitle: string;
	@Input() userAvatarUrl: string;

	@Input() navGroups: NavGroup[] = [];

	@Output() logoutClick = new EventEmitter();
	@Output() changelogClick = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

	canActivateGroup(group: NavGroup) {
		const tasks = group.items.map(item => {
			if (item.canActivate$) {
				return item.canActivate$;
			}

			return of(true);
		});

		return combineLatest(tasks)
			.pipe(map(values => {
				return values.some(v => !!v);
			}));
	}
}

export interface NavGroup {
	title?: string;
	items: NavItem[];
}

export interface NavItem {
	titleKey: string;
	path: string;
	icon?: string;
	svgIcon?: string;
	canActivate$?: Observable<boolean>;
}

