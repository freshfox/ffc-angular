import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidenavComponent} from './sidenav.component';
import {MatIconModule} from '@angular/material/icon';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FFAvatarModule} from '../avatar/index';

export * from './sidenav.component';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		BrowserAnimationsModule,
		RouterModule,
		TranslateModule,
		FFAvatarModule,
	],
	declarations: [SidenavComponent],
	exports: [SidenavComponent],
})
export class FFSidenavModule {
}
