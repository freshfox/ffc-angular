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
var $ = require("jquery");
window['jQuery'] = window['$'] = $;
require("chosen-js");
var SelectComponent = (function () {
    function SelectComponent(el) {
        this.el = el;
        this.valueKey = 'id';
        this.nameKey = 'name';
        this.selectedValueChange = new core_1.EventEmitter();
        this.enableSearchField = true;
        this.disabledSet = false;
        this.isFocused = false;
        this.isOpen = false;
    }
    Object.defineProperty(SelectComponent.prototype, "disabled", {
        set: function (value) {
            this.disabledSet = true;
        },
        enumerable: true,
        configurable: true
    });
    SelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        var emit = false;
        if (this.selectedValue) {
            this.initialValue = this.selectedValue;
        }
        else {
            this.initialValue = this.getValueForIndex(0);
            emit = true;
        }
        setTimeout(function () {
            _this.selectedValue = _this.initialValue;
            if (emit) {
                _this.selectedValueChange.emit(_this.initialValue);
            }
        }, 1);
    };
    SelectComponent.prototype.ngOnChanges = function () {
        this.updateValue();
    };
    SelectComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.select = this.el.nativeElement.querySelector('select');
        this.$select = $(this.select).chosen({
            no_results_text: 'Keine Ergebnisse für',
            disable_search: !this.enableSearchField
        });
        this.$select.change(function (e, params) {
            var value = params.selected;
            if (value === '') {
                value = null;
            }
            _this.selectedValue = value;
            _this.onChange();
        });
        this.updateValue();
        this.$select.on('chosen:showing_dropdown chosen:hiding_dropdown', function (e) {
            var chosen_container = $(e.target).next('.chosen-container'), classState = e.type == 'chosen:showing_dropdown' && dropdownExceedsBottomViewport();
            function dropdownExceedsBottomViewport() {
                var dropdown = chosen_container.find('.chosen-drop'), dropdown_top = dropdown.offset().top - document.documentElement.scrollTop, dropdown_height = dropdown.height(), viewport_height = document.documentElement.clientHeight;
                return dropdown_top + dropdown_height > viewport_height;
            }
            chosen_container.toggleClass('chosen-drop-up', classState);
        });
        var $chosenSingle = this.$select.find('.chosen-search-input');
        $chosenSingle.on('focus', function () {
            _this.isFocused = true;
        });
        $chosenSingle.on('blur', function () {
            _this.isFocused = false;
        });
    };
    SelectComponent.prototype.updateValue = function () {
        if (this.$select) {
            this.$select.val(this.selectedValue).trigger('chosen:updated');
        }
    };
    SelectComponent.prototype.ngOnDestroy = function () {
        this.$select.chosen('destroy');
    };
    SelectComponent.prototype.getValue = function (option) {
        var value = option[this.valueKey];
        return (value === undefined || value === null) ? '' : value;
    };
    SelectComponent.prototype.getValueForIndex = function (index) {
        return this.getValue(this.options[index]);
    };
    SelectComponent.prototype.getName = function (option) {
        return option[this.nameKey] || this.getValue(option);
    };
    SelectComponent.prototype.onChange = function () {
        this.selectedValueChange.emit(this.selectedValue);
    };
    return SelectComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "valueKey", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "nameKey", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "class", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SelectComponent.prototype, "disabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "selectedValue", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SelectComponent.prototype, "selectedValueChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "enableSearchField", void 0);
SelectComponent = __decorate([
    core_1.Component({
        selector: 'ff-select',
        template: "\n        <label *ngIf=\"label\">{{ label }}</label>\n        <select #s class=\"{{ class }}\" [disabled]=\"disabledSet\">\n            <option\n                    *ngFor=\"let option of options\"\n                    [attr.value]=\"getValue(option)\">{{ getName(option) }}\n            </option>\n        </select>",
        host: {
            '[class.ff-focused]': 'isFocused',
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], SelectComponent);
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map