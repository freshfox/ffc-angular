import { OnInit } from "@angular/core";
export declare class ConfirmComponent implements OnInit {
    title: string;
    message: string;
    onCancel: Function;
    onConfirm: Function;
    constructor();
    ngOnInit(): void;
    confirm(): void;
    cancel(): void;
}
