/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {FFSelectModule} from 'ffc-angular';

@Component({
  selector: 'app',
  template: `<ff-select></ff-select>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, FFSelectModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
