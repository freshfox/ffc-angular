import {NgModule} from '@angular/core';
import {FFTableModule} from './table/index';
import {FFIconModule} from './icon/index';
import {FFSpinnerModule} from './spinner/index';
import {FFModalModule} from './modal/index';
import {FFCoreModule} from './core/index';
import {FFButtonModule} from './button/index';
import {FFDropdownModule} from './dropdown/index';
import {FFSnackbarModule} from './snackbar/index';
import {FFInputModule} from './input/index';
import {FFSelectModule} from './select/index';

export * from './core/index';
export * from './table/index';
export * from './spinner/index';
export * from './icon/index';
export * from './modal/index';
export * from './button/index';
export * from './dropdown/index';
export * from './snackbar/index';
export * from './input/index';
export * from './select/index';

const FF_MODULES = [
	FFCoreModule,
	FFTableModule,
	FFIconModule,
	FFSpinnerModule,
	FFModalModule,
	FFButtonModule,
	FFDropdownModule,
	FFSnackbarModule,
	FFInputModule,
	FFSelectModule
];

@NgModule({
	imports: FF_MODULES,
	exports: FF_MODULES,
})
export class FFModule {}
