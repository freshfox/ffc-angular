import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {IconComponent} from "./components/icon.component";
import {ButtonComponent} from "./components/button.component";
import {SpinnerComponent} from "./components/spinner.component";
import {FFMaterialModule} from "./components/material.module";

@NgModule({
    imports: [BrowserModule, FFMaterialModule],
    declarations: [
        IconComponent,
        ButtonComponent,
        SpinnerComponent
    ],
    exports: [
        IconComponent,
        ButtonComponent,
        SpinnerComponent
    ],
})
export class FFCoreModule {
}
