import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Params} from '@angular/router';

@Component({
	selector: 'ff-breadcrumbs-list',
	template: `
		<ol class="ff-breadcrumbs__list">
			<li *ngFor="let item of items; let last = last" [class.active]="last">
				<a *ngIf="!last && item.url" [routerLink]="getUrl(item)">
					{{ item.label | async }}
				</a>

				<a *ngIf="!last && !item.url" href="javascript:void(0)" (click)="itemClick.emit(item)">
					{{ item.label | async }}
				</a>

				<span *ngIf="last">{{ item.label | async }}</span>
				<mat-icon>chevron_right</mat-icon>
			</li>
		</ol>`,
})
export class BreadcrumbsListComponent {

	@HostBinding('class') clazz = 'ff-breadcrumbs';

	@Input() items: BreadcrumbListItem[];
	@Output() itemClick = new EventEmitter<BreadcrumbListItem>();

	constructor() {
	}

	getUrl(breadcrumb: BreadcrumbListItem) {
		if (!breadcrumb.url) {
			return null;
		}

		return Object.keys(breadcrumb.params)?.length ? [breadcrumb.url, breadcrumb.params] : [breadcrumb.url];
	}
}

export interface BreadcrumbListItem {
	label: Observable<string>;
	url?: string;
	params?: Params;
}
