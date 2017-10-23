import {NgModule} from '@angular/core';
import {FFTableModule} from './table/index';
import {FFIconModule} from './icon/index';
import {FFSpinnerModule} from './spinner/index';
import {FFModalModule} from './modal/index';
import {FFCoreModule} from './core/index';

export * from './core/index';
export * from './table/index';
export * from './spinner/index';
export * from './icon/index';
export * from './modal/index';

const FF_MODULES = [
	FFCoreModule,
	FFTableModule,
	FFIconModule,
	FFSpinnerModule,
	FFModalModule
];

@NgModule({
	imports: FF_MODULES,
	exports: FF_MODULES,
})
export class FFModule {}
