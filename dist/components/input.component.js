"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
exports.FF_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InputComponent; }),
    multi: true
};
var InputComponent = (function () {
    function InputComponent(el) {
        this.el = el;
        this.type = 'text';
        this.placeholder = '';
        this.focus = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
        this.isFocused = false;
        this.value = '';
        this.disabledSet = false;
        this.selector = el.nativeElement.localName;
    }
    Object.defineProperty(InputComponent.prototype, "disabled", {
        set: function (value) {
            if (value !== false) {
                this.disabledSet = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    InputComponent.prototype.ngOnInit = function () {
        this.name = this.getFieldName();
    };
    InputComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.selector === 'ff-textarea') {
            var textarea_1 = this.el.nativeElement.querySelector('textarea');
            if (textarea_1) {
                setTimeout(function () {
                    _this.autoGrow(textarea_1);
                }, 1);
            }
        }
    };
    InputComponent.prototype.getFieldName = function () {
        var parent = this.formControl ? this.formControl['_parent'] : null;
        if (!parent) {
            return;
        }
        var siblings = Object.keys(parent.controls);
        for (var i = 0; i < siblings.length; i++) {
            var key = siblings[i];
            if (parent.controls[key] == this.formControl) {
                return key;
            }
        }
    };
    InputComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    InputComponent.prototype.onChange = function () {
        this.onChangeCallback(this.value);
    };
    InputComponent.prototype.onFocus = function (event) {
        this.focus.next(event);
        this.isFocused = true;
    };
    InputComponent.prototype.onBlur = function (event) {
        this.blur.next(event);
        this.isFocused = false;
        this.onTouchedCallback();
    };
    InputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    InputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    InputComponent.prototype.autoGrow = function (element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    };
    return InputComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormControl)
], InputComponent.prototype, "formControl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputComponent.prototype, "alwaysShowDecimals", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InputComponent.prototype, "numberOfDecimals", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InputComponent.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InputComponent.prototype, "disabled", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputComponent.prototype, "focus", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputComponent.prototype, "blur", void 0);
InputComponent = __decorate([
    core_1.Component({
        selector: 'ff-input,ff-textarea',
        template: "\n        <label *ngIf=\"label\">{{ label }}</label>\n\n        <textarea\n                *ngIf=\"selector == 'ff-textarea'\"\n                [placeholder]=\"placeholder\"\n                [attr.name]=\"name\"\n                [(ngModel)]=\"value\"\n                (blur)=\"onBlur($event)\"\n                (focus)=\"onFocus($event)\"\n                (ngModelChange)=\"onChange()\"\n                [tabindex]=\"tabindex ? tabindex : null\"\n                [attr.disabled]=\"disabledSet ? true : null\"\n                (input)=\"autoGrow($event.target)\"\n        ></textarea>\n\n        <input\n                *ngIf=\"type == 'date' && selector == 'ff-input'\"\n                ff-datepicker\n                type=\"text\"\n                [placeholder]=\"placeholder\"\n                [attr.name]=\"name\"\n                [(ngModel)]=\"value\"\n                (blur)=\"onBlur($event)\"\n                (focus)=\"onFocus($event)\"\n                [attr.disabled]=\"disabledSet ? true : null\"\n                (ngModelChange)=\"onChange()\"\n                [tabindex]=\"tabindex\">\n\n        <input\n                *ngIf=\"type != 'date' && type != 'money' && selector == 'ff-input'\"\n                [type]=\"type\"\n                [placeholder]=\"placeholder\"\n                [attr.name]=\"name\"\n                [(ngModel)]=\"value\"\n                (blur)=\"onBlur($event)\"\n                (focus)=\"onFocus($event)\"\n                [attr.disabled]=\"disabledSet ? true : null\"\n                (ngModelChange)=\"onChange()\"\n                [tabindex]=\"tabindex ? tabindex : null\">\n\n        <input\n                ff-amount\n                *ngIf=\"type == 'money' && selector == 'ff-input'\"\n                [alwaysShowDecimals]=\"alwaysShowDecimals\"\n                [numberOfDecimals]=\"numberOfDecimals\"\n                type=\"text\"\n                [placeholder]=\"placeholder\"\n                [attr.name]=\"name\"\n                [(ngModel)]=\"value\"\n                (blur)=\"onBlur($event)\"\n                (focus)=\"onFocus($event)\"\n                [attr.disabled]=\"disabledSet ? true : null\"\n                (ngModelChange)=\"onChange()\"\n                [tabindex]=\"tabindex ? tabindex : null\">\n\n        <ff-control-messages *ngIf=\"formControl\" [control]=\"formControl\"></ff-control-messages>\n    ",
        providers: [exports.FF_INPUT_CONTROL_VALUE_ACCESSOR],
        host: {
            '[class.ff-focused]': 'isFocused',
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], InputComponent);
exports.InputComponent = InputComponent;
//# sourceMappingURL=input.component.js.map