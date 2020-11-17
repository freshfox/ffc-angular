import {NgModule} from '@angular/core';
import {CanDeactivateUnsaved, CanDeactivateUnsavedService} from './can-deactivate';
import {FFDialogModule} from '../dialog/index';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
	imports: [FFDialogModule, MatDialogModule],
	exports: [],
	declarations: [],
	providers: [
		CanDeactivateUnsaved,
		CanDeactivateUnsavedService,
	],
})
export class FFCanDeactivateUnsavedModule {
}
