import {NgModule} from '@angular/core';
import {SpinnerComponent} from './spinner.component';
import {MatProgressSpinnerModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

export * from './spinner.component';

@NgModule({
	imports: [CommonModule, BrowserModule, MatProgressSpinnerModule],
	declarations: [SpinnerComponent],
	exports: [SpinnerComponent],
})
export class FFSpinnerModule {
}