var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ElementRef, Directive, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import Pikaday from 'pikaday';
import * as moment from 'moment';
export const DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerDirective),
    multi: true
};
let DatePickerDirective = class DatePickerDirective {
    constructor(el) {
        this.el = el;
        this.onChangeCallback = () => {
        };
        this.format = 'DD.MM.YYYY';
        this.onTouched = () => {
        };
    }
    ngOnInit() {
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
    }
    ngOnDestroy() {
        this.picker.destroy();
    }
    writeValue(value) {
        if (value == undefined) {
            value = new Date();
        }
        this.picker.setDate(value);
        this.onChange();
    }
    onChange() {
        let val = this.el.nativeElement.value;
        let momentInstance = moment(val, this.format);
        if (momentInstance.isValid()) {
            val = momentInstance.format('YYYY-MM-DD');
        }
        this.onChangeCallback(val);
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
};
DatePickerDirective = __decorate([
    Directive({
        selector: 'input[ff-datepicker]',
        providers: [DATEPICKER_VALUE_ACCESSOR],
        host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
    }),
    __metadata("design:paramtypes", [ElementRef])
], DatePickerDirective);
export { DatePickerDirective };
//# sourceMappingURL=input-date.directive.js.map