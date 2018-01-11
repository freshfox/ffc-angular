import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Formatter} from './formatter';

export * from './helpers';
export * from './form-helpers';
export * from './translate-packaged-loader';
export * from './form-validator';
export * from './number.pipe';
export * from './formatter';

@NgModule({
	imports: [BrowserModule],
	providers: [Formatter]
})
export class FFCoreModule {
}