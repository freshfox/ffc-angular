import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Formatter} from './formatter';
import {NumberPipe} from './number.pipe';

export * from './helpers';
export * from './form-helpers';
export * from './translate-packaged-loader';
export * from './form-validator';
export * from './number.pipe';
export * from './formatter';

@NgModule({
	declarations: [NumberPipe],
	imports: [BrowserModule],
	providers: [Formatter, NumberPipe],
	exports: [NumberPipe]
})
export class FFCoreModule {
}