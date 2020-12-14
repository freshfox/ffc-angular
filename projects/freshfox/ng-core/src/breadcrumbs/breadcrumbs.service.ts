import {Injectable, Injector, Type} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable()
export class BreadcrumbsService {

	breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

	constructor(private activatedRoute: ActivatedRoute, private router: Router, private injector: Injector) {
		if (this.router.navigated) {
			this.updateBreadcrumbs();
		}

		// subscribe to the NavigationEnd event
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => {
				this.updateBreadcrumbs();
			});
	}

	private updateBreadcrumbs() {
		const breadcrumbs: Breadcrumb[] = [];

		let currentRoute: ActivatedRoute = this.activatedRoute.root;

		while (currentRoute.children.length > 0) {
			const childrenRoutes: ActivatedRoute[] = currentRoute.children;

			for (const route of childrenRoutes) {
				currentRoute = route;
				if (route.outlet !== PRIMARY_OUTLET) {
					return;
				}

				if (route.routeConfig?.data?.breadcrumbs) {
					const breadcrumbConfig: BreadcrumbConfigItem[] = route.routeConfig.data.breadcrumbs;

					for (const item of breadcrumbConfig) {
						let label: Observable<string>;

						const params: Params = {};
						for (const path of route.pathFromRoot) {
							Object.assign(params, path.snapshot.params);
						}

						if (item.label) {
							label = of(item.label);
						} else if (item.resolver) {
							const resolver = this.injector.get(item.resolver);
							label = resolver.getTitle(params);
						}

						let url: string;
						if (!item.url) {
							const routeUrl = route.pathFromRoot
								.map(r => r.snapshot.url.map(segment => segment.path).join('/'))
								.filter(segment => segment).join('/');
							url = `/${routeUrl}`;
						} else {
							url = this.formatUrl(item.url, params);
						}

						breadcrumbs.push({
							label,
							params,
							url
						});
					}
				}
			}
		}

		this.breadcrumbs$.next(breadcrumbs);
	}

	private formatUrl(url: string, params: Params) {
		const parts = url.split('/');
		return parts.map(p => {
			if (p.startsWith(':') && params.hasOwnProperty(p.substring(1))) {
				return params[p.substring(1)];
			}

			return p;
		}).join('/');
	}

}

export interface BreadcrumbConfigItem {
	label: string;
	resolver?: Type<BreadcrumbResolver>;
	url?: string;
}

export interface Breadcrumb {
	url: string;
	params: Params;
	label: Observable<string>;
}

export interface BreadcrumbResolver {
	getTitle(params: any): Observable<string>;
}
