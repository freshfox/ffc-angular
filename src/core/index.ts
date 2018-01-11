import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Formatter} from './formatter';
import {NumberPipe} from './number.pipe';
import {SafePipe} from './safe.pipe';

export * from './helpers';
export * from './form-helpers';
export * from './translate-packaged-loader';
export * from './form-validator';
export * from './number.pipe';
export * from './formatter';
export * from './safe.pipe';

@NgModule({
	declarations: [NumberPipe, SafePipe],
	imports: [BrowserModule],
	providers: [Formatter, NumberPipe, SafePipe],
	exports: [NumberPipe, SafePipe]
})
export class FFCoreModule {
}