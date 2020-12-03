import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidenavComponent} from './sidenav.component';
import {MatIconModule} from '@angular/material/icon';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FFAvatarModule} from '../avatar/index';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

export * from './sidenav.component';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		BrowserAnimationsModule,
		RouterModule,
		TranslateModule,
		FFAvatarModule,
		MatButtonModule,
		MatTooltipModule,
	],
	declarations: [SidenavComponent],
	exports: [SidenavComponent],
})
export class FFSidenavModule {
}
