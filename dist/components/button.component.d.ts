import { ElementRef, SimpleChange, AfterViewInit, OnChanges, OnDestroy } from "@angular/core";
export declare class ButtonComponent implements AfterViewInit, OnChanges, OnDestroy {
    private el;
    loading: any;
    class: any;
    icon: string;
    disabled: boolean;
    private laddaButton;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [propKey: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    updateLoadingState(newLoadingState: any): void;
}
