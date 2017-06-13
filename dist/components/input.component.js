var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, forwardRef, ElementRef, EventEmitter, Output, Input } from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
export const FF_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
};
let InputComponent = class InputComponent {
    constructor(el) {
        this.el = el;
        this.type = 'text';
        this.placeholder = '';
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
        this.isFocused = false;
        this.value = '';
        this.disabledSet = false;
        this.selector = el.nativeElement.localName;
    }
    set disabled(value) {
        if (value !== false) {
            this.disabledSet = true;
        }
    }
    ngOnInit() {
        this.name = this.getFieldName();
    }
    ngAfterViewInit() {
        if (this.selector === 'ff-textarea') {
            let textarea = this.el.nativeElement.querySelector('textarea');
            if (textarea) {
                setTimeout(() => {
                    this.autoGrow(textarea);
                }, 1);
            }
        }
    }
    getFieldName() {
        let parent = this.formControl ? this.formControl['_parent'] : null;
        if (!parent) {
            return;
        }
        let siblings = Object.keys(parent.controls);
        for (let i = 0; i < siblings.length; i++) {
            let key = siblings[i];
            if (parent.controls[key] == this.formControl) {
                return key;
            }
        }
    }
    writeValue(value) {
        this.value = value;
    }
    onChange() {
        this.onChangeCallback(this.value);
    }
    onFocus(event) {
        this.focus.next(event);
        this.isFocused = true;
    }
    onBlur(event) {
        this.blur.next(event);
        this.isFocused = false;
        this.onTouchedCallback();
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    autoGrow(element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], InputComponent.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], InputComponent.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", FormControl)
], InputComponent.prototype, "formControl", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], InputComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], InputComponent.prototype, "alwaysShowDecimals", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], InputComponent.prototype, "numberOfDecimals", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], InputComponent.prototype, "tabindex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InputComponent.prototype, "disabled", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], InputComponent.prototype, "focus", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], InputComponent.prototype, "blur", void 0);
InputComponent = __decorate([
    Component({
        selector: 'ff-input,ff-textarea',
        template: `
        <label *ngIf="label">{{ label }}</label>

        <textarea
                *ngIf="selector == 'ff-textarea'"
                [placeholder]="placeholder"
                [attr.name]="name"
                [(ngModel)]="value"
                (blur)="onBlur($event)"
                (focus)="onFocus($event)"
                (ngModelChange)="onChange()"
                [tabindex]="tabindex ? tabindex : null"
                [attr.disabled]="disabledSet ? true : null"
                (input)="autoGrow($event.target)"
        ></textarea>

        <input
                *ngIf="type == 'date' && selector == 'ff-input'"
                ff-datepicker
                type="text"
                [placeholder]="placeholder"
                [attr.name]="name"
                [(ngModel)]="value"
                (blur)="onBlur($event)"
                (focus)="onFocus($event)"
                [attr.disabled]="disabledSet ? true : null"
                (ngModelChange)="onChange()"
                [tabindex]="tabindex">

        <input
                *ngIf="type != 'date' && type != 'money' && selector == 'ff-input'"
                [type]="type"
                [placeholder]="placeholder"
                [attr.name]="name"
                [(ngModel)]="value"
                (blur)="onBlur($event)"
                (focus)="onFocus($event)"
                [attr.disabled]="disabledSet ? true : null"
                (ngModelChange)="onChange()"
                [tabindex]="tabindex ? tabindex : null">

        <input
                ff-amount
                *ngIf="type == 'money' && selector == 'ff-input'"
                [alwaysShowDecimals]="alwaysShowDecimals"
                [numberOfDecimals]="numberOfDecimals"
                type="text"
                [placeholder]="placeholder"
                [attr.name]="name"
                [(ngModel)]="value"
                (blur)="onBlur($event)"
                (focus)="onFocus($event)"
                [attr.disabled]="disabledSet ? true : null"
                (ngModelChange)="onChange()"
                [tabindex]="tabindex ? tabindex : null">

        <ff-control-messages *ngIf="formControl" [control]="formControl"></ff-control-messages>
    `,
        providers: [FF_INPUT_CONTROL_VALUE_ACCESSOR],
        host: {
            '[class.ff-focused]': 'isFocused',
        }
    }),
    __metadata("design:paramtypes", [ElementRef])
], InputComponent);
export { InputComponent };
//# sourceMappingURL=input.component.js.map