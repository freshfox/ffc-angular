import {NgModule} from '@angular/core';
import {CanDeactivateUnsaved, CanDeactivateUnsavedService} from './can-deactivate';
import {FFDialogModule} from '../dialog/index';

export * from './can-deactivate';

@NgModule({
	imports: [FFDialogModule],
	exports: [],
	declarations: [],
	providers: [
		CanDeactivateUnsaved,
		CanDeactivateUnsavedService,
	],
})
export class FFCanDeactivateUnsavedModule {
}
