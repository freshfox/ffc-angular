import { OnDestroy, OnInit } from "@angular/core";
export declare class SpinnerComponent implements OnInit, OnDestroy {
    progress: number;
    private interval;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
