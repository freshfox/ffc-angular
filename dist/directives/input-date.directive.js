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
var Pikaday = require("pikaday");
var moment = require("moment");
exports.DATEPICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DatePickerDirective; }),
    multi: true
};
var DatePickerDirective = (function () {
    function DatePickerDirective(el) {
        this.el = el;
        this.onChangeCallback = function () {
        };
        this.format = 'DD.MM.YYYY';
        this.onTouched = function () {
        };
    }
    DatePickerDirective.prototype.ngOnInit = function () {
        this.picker = new Pikaday({
            field: this.el.nativeElement,
            format: this.format,
            i18n: {
                months: moment.localeData().months(),
                weekdays: moment.localeData().weekdays(),
                weekdaysShort: moment.localeData().weekdaysShort()
            }
        });
        document.removeEventListener('keydown', this.picker._onKeyChange);
    };
    DatePickerDirective.prototype.ngOnDestroy = function () {
        this.picker.destroy();
    };
    DatePickerDirective.prototype.writeValue = function (value) {
        if (value == undefined) {
            value = new Date();
        }
        this.picker.setDate(value);
        this.onChange();
    };
    DatePickerDirective.prototype.onChange = function () {
        var val = this.el.nativeElement.value;
        var momentInstance = moment(val, this.format);
        if (momentInstance.isValid()) {
            val = momentInstance.format('YYYY-MM-DD');
        }
        this.onChangeCallback(val);
    };
    DatePickerDirective.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DatePickerDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return DatePickerDirective;
}());
DatePickerDirective = __decorate([
    core_1.Directive({
        selector: 'input[ff-datepicker]',
        providers: [exports.DATEPICKER_VALUE_ACCESSOR],
        host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DatePickerDirective);
exports.DatePickerDirective = DatePickerDirective;
//# sourceMappingURL=input-date.directive.js.map