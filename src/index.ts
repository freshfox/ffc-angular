import {NgModule} from '@angular/core';
import {FFTableModule} from './table/index';
import {FFIconModule} from './icon/index';
import {FFSpinnerModule} from './spinner/index';

export * from './table/index';
export * from './spinner/index';
export * from './spinner/index';

const FF_MODULES = [
	FFTableModule,
	FFIconModule,
	FFSpinnerModule
];

@NgModule({
	imports: FF_MODULES,
	exports: FF_MODULES,
})
export class FFModule {}
