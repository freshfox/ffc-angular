import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {Breadcrumb, BreadcrumbsService} from './breadcrumbs.service';
import {Observable} from 'rxjs';

@Component({
	selector: 'ff-breadcrumbs',
	template: `
		<ol class="ff-breadcrumbs__list">
			<li *ngFor="let breadcrumb of breadcrumbs$ | async; let last = last" [class.active]="last">
				<a *ngIf="!last" [routerLink]="getParams(breadcrumb)">
					{{ breadcrumb.label | async}}
				</a>
				<span *ngIf="last">{{ breadcrumb.label | async }}</span>
				<mat-icon>chevron_right</mat-icon>
			</li>
		</ol>`,
	encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsComponent {

	@HostBinding('class') clazz = 'ff-breadcrumbs';

	breadcrumbs$: Observable<Breadcrumb[]>;

	constructor(private breadcrumbService: BreadcrumbsService) {
		this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
	}

	getParams(breadcrumb: Breadcrumb) {
		return Object.keys(breadcrumb.params).length ? [breadcrumb.url, breadcrumb.params] : [breadcrumb.url];
	}
}
