import {NgModule} from '@angular/core';
import {BreadcrumbsComponent} from './breadcrumbs.component';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {BreadcrumbsService} from './breadcrumbs.service';
import { MatIconModule } from '@angular/material/icon';
import {BreadcrumbsListComponent} from './breadcrumbs-list.component';

export { BreadcrumbResolver } from './breadcrumbs.service';

@NgModule({
	declarations: [
		BreadcrumbsListComponent,
		BreadcrumbsComponent
	],
	providers: [
		BreadcrumbsService
	],
	imports: [
		RouterModule,
		BrowserModule,
		CommonModule,
		MatIconModule,
	],
	exports: [
		BreadcrumbsComponent,
		BreadcrumbsListComponent,
	]
})
export class FFBreadcrumbsModule {
	constructor() {
	}

}
