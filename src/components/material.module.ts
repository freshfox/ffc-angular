import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {MdProgressSpinner} from "@angular/material";

@NgModule({
    imports: [BrowserModule],
    declarations: [
        MdProgressSpinner,
    ],
    exports: [
        MdProgressSpinner
    ],
})
export class FFMaterialModule {
}
