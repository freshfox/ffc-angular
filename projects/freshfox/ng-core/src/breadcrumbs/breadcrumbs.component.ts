import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {Breadcrumb, BreadcrumbsService} from './breadcrumbs.service';
import {Observable} from 'rxjs';
import {BreadcrumbListItem} from './breadcrumbs-list.component';

@Component({
	selector: 'ff-breadcrumbs',
	template: `
		<ff-breadcrumbs-list [items]="items$ | async"></ff-breadcrumbs-list>
	`,
	encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsComponent {

	@HostBinding('class') clazz = 'ff-breadcrumbs';

	breadcrumbs$: Observable<Breadcrumb[]>;
	items$: Observable<BreadcrumbListItem[]>;

	constructor(private breadcrumbService: BreadcrumbsService) {
		this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
		this.items$ = this.breadcrumbs$;
	}
}
