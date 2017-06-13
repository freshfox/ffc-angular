var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import * as $ from 'jquery';
window['jQuery'] = window['$'] = $;
import 'chosen-js';
let SelectComponent = class SelectComponent {
    constructor(el) {
        this.el = el;
        this.valueKey = 'id';
        this.nameKey = 'name';
        this.selectedValueChange = new EventEmitter();
        this.enableSearchField = true;
        this.disabledSet = false;
        this.isFocused = false;
        this.isOpen = false;
    }
    set disabled(value) {
        this.disabledSet = true;
    }
    ngOnInit() {
        var emit = false;
        if (this.selectedValue) {
            this.initialValue = this.selectedValue;
        }
        else {
            this.initialValue = this.getValueForIndex(0);
            emit = true;
        }
        setTimeout(() => {
            this.selectedValue = this.initialValue;
            if (emit) {
                this.selectedValueChange.emit(this.initialValue);
            }
        }, 1);
    }
    ngOnChanges() {
        this.updateValue();
    }
    ngAfterViewInit() {
        this.select = this.el.nativeElement.querySelector('select');
        this.$select = $(this.select).chosen({
            no_results_text: 'Keine Ergebnisse für',
            disable_search: !this.enableSearchField
        });
        this.$select.change((e, params) => {
            let value = params.selected;
            if (value === '') {
                value = null;
            }
            this.selectedValue = value;
            this.onChange();
        });
        this.updateValue();
        this.$select.on('chosen:showing_dropdown chosen:hiding_dropdown', function (e) {
            let chosen_container = $(e.target).next('.chosen-container'), classState = e.type == 'chosen:showing_dropdown' && dropdownExceedsBottomViewport();
            function dropdownExceedsBottomViewport() {
                let dropdown = chosen_container.find('.chosen-drop'), dropdown_top = dropdown.offset().top - document.documentElement.scrollTop, dropdown_height = dropdown.height(), viewport_height = document.documentElement.clientHeight;
                return dropdown_top + dropdown_height > viewport_height;
            }
            chosen_container.toggleClass('chosen-drop-up', classState);
        });
        let $chosenSingle = this.$select.find('.chosen-search-input');
        $chosenSingle.on('focus', () => {
            this.isFocused = true;
        });
        $chosenSingle.on('blur', () => {
            this.isFocused = false;
        });
    }
    updateValue() {
        if (this.$select) {
            this.$select.val(this.selectedValue).trigger('chosen:updated');
        }
    }
    ngOnDestroy() {
        this.$select.chosen('destroy');
    }
    getValue(option) {
        let value = option[this.valueKey];
        return (value === undefined || value === null) ? '' : value;
    }
    getValueForIndex(index) {
        return this.getValue(this.options[index]);
    }
    getName(option) {
        return option[this.nameKey] || this.getValue(option);
    }
    onChange() {
        this.selectedValueChange.emit(this.selectedValue);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "valueKey", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "nameKey", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "class", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SelectComponent.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "selectedValue", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "selectedValueChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "enableSearchField", void 0);
SelectComponent = __decorate([
    Component({
        selector: 'ff-select',
        template: `
        <label *ngIf="label">{{ label }}</label>
        <select #s class="{{ class }}" [disabled]="disabledSet">
            <option
                    *ngFor="let option of options"
                    [attr.value]="getValue(option)">{{ getName(option) }}
            </option>
        </select>`,
        host: {
            '[class.ff-focused]': 'isFocused',
        }
    }),
    __metadata("design:paramtypes", [ElementRef])
], SelectComponent);
export { SelectComponent };
//# sourceMappingURL=select.component.js.map