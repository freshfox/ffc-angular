import {NgModule} from '@angular/core';
import {SpinnerComponent} from './spinner.component';
import {MdProgressSpinnerModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

export * from './spinner.component';

@NgModule({
	imports: [CommonModule, BrowserModule, MdProgressSpinnerModule],
	declarations: [SpinnerComponent],
	exports: [SpinnerComponent],
})
export class FFSpinnerModule {
}