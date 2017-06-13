import { OnInit, ElementRef } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
export declare const DATEPICKER_VALUE_ACCESSOR: any;
export declare class DatePickerDirective implements OnInit, ControlValueAccessor {
    private el;
    private picker;
    private onChangeCallback;
    private format;
    onTouched: () => void;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(value: any): void;
    onChange(): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
