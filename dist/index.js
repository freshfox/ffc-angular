import { Component, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, Injectable, Injector, Input, NgModule, Output, ReflectiveInjector, ViewChild, ViewContainerRef, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { create } from 'ladda';
import * as Ladda from 'ladda';
import { MdProgressSpinner } from '@angular/material';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import $ from 'jquery';
import 'chosen-js';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import Pikaday from 'pikaday';
import moment from 'moment';

var IconComponent = (function () {
    function IconComponent() {
    }
    return IconComponent;
}());
IconComponent.decorators = [
    { type: Component, args: [{
                selector: 'ff-icon',
                template: "\n        <svg>\n            <use attr.xlink:href=\"/assets/images/icons.svg#{{ name }}\"></use>\n        </svg>",
                host: {
                    'class': 'ff-icon'
                }
            },] },
];
/**
 * @nocollapse
 */
IconComponent.ctorParameters = function () { return []; };
IconComponent.propDecorators = {
    'name': [{ type: Input },],
};

var ButtonComponent = (function () {
    /**
     * @param {?} el
     */
    function ButtonComponent(el) {
        this.el = el;
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    ButtonComponent.prototype.ngAfterViewInit = function () {
        if (typeof this.loading !== 'undefined') {
            this.laddaButton = create(this.el.nativeElement);
            this.updateLoadingState(this.loading);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ButtonComponent.prototype.ngOnChanges = function (changes) {
        for (var /** @type {?} */ propName in changes) {
            if (propName === 'loading') {
                var /** @type {?} */ changedProp = changes[propName];
                this.updateLoadingState(changedProp.currentValue);
            }
        }
    };
    /**
     * @return {?}
     */
    ButtonComponent.prototype.ngOnDestroy = function () {
        if (this.laddaButton) {
            this.laddaButton.remove();
        }
    };
    /**
     * @param {?} newLoadingState
     * @return {?}
     */
    ButtonComponent.prototype.updateLoadingState = function (newLoadingState) {
        if (this.laddaButton) {
            if (newLoadingState) {
                this.laddaButton.start();
            }
            else {
                this.laddaButton.stop();
            }
        }
    };
    return ButtonComponent;
}());
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: '[ff-button]',
                template: "\n        <div class=\"ff-button__inner\">\n            <ff-icon *ngIf=\"icon\" [name]=\"icon\"></ff-icon>\n            <span class=\"ladda-label\">\n                <ng-content></ng-content>\n            </span>\n        </div>",
                host: {
                    '[class]': '"ff-button" + class',
                    'data-style': 'zoom-in',
                    '[attr.disabled]': 'disabled ? true : null',
                }
            },] },
];
/**
 * @nocollapse
 */
ButtonComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
ButtonComponent.propDecorators = {
    'loading': [{ type: Input },],
    'class': [{ type: Input },],
    'icon': [{ type: Input },],
    'disabled': [{ type: Input },],
};

var SpinnerComponent = (function () {
    function SpinnerComponent() {
    }
    /**
     * @return {?}
     */
    SpinnerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.interval = setInterval(function () {
            return _this.progress;
        }, 200);
    };
    /**
     * @return {?}
     */
    SpinnerComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.interval);
        this.interval = null;
    };
    return SpinnerComponent;
}());
SpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ff-spinner',
                template: "\n        <md-progress-spinner mode=\"indeterminate\" *ngIf=\"progress >= 100 || progress === undefined\"></md-progress-spinner>\n        <md-progress-spinner mode=\"determinate\" [value]=\"progress\"\n                             *ngIf=\"progress > 0 && progress < 100\"></md-progress-spinner>",
                host: {
                    'class': 'ff-spinner'
                }
            },] },
];
/**
 * @nocollapse
 */
SpinnerComponent.ctorParameters = function () { return []; };
SpinnerComponent.propDecorators = {
    'progress': [{ type: Input },],
};

var FFMaterialModule = (function () {
    function FFMaterialModule() {
    }
    return FFMaterialModule;
}());
FFMaterialModule.decorators = [
    { type: NgModule, args: [{
                imports: [BrowserModule],
                declarations: [
                    MdProgressSpinner,
                ],
                exports: [
                    MdProgressSpinner
                ],
            },] },
];
/**
 * @nocollapse
 */
FFMaterialModule.ctorParameters = function () { return []; };

var ConfirmComponent = (function () {
    function ConfirmComponent() {
    }
    /**
     * @return {?}
     */
    ConfirmComponent.prototype.ngOnInit = function () {
    };
    /**
     * @return {?}
     */
    ConfirmComponent.prototype.confirm = function () {
        this.onConfirm();
    };
    /**
     * @return {?}
     */
    ConfirmComponent.prototype.cancel = function () {
        this.onCancel();
    };
    return ConfirmComponent;
}());
ConfirmComponent.decorators = [
    { type: Component, args: [{
                selector: 'ff-confirm',
                template: "\n        <div class=\"modal-header\" *ngIf=\"title\">\n            {{ title }}\n        </div>\n\n        <div class=\"modal-inner\">\n            <p class=\"nmb\">{{ message }}</p>\n        </div>\n\n        <div class=\"modal-footer\">\n            <button ff-button class=\"button--secondary\" (click)=\"cancel()\">{{ 'general.cancel' | translate }}</button>\n            <button ff-button (click)=\"confirm()\">{{ 'general.delete' | translate }}</button>\n        </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
ConfirmComponent.ctorParameters = function () { return []; };
ConfirmComponent.propDecorators = {
    'title': [{ type: Input },],
    'message': [{ type: Input },],
    'onCancel': [{ type: Output },],
    'onConfirm': [{ type: Output },],
};

var ControlMessagesComponent$$1 = (function () {
    /**
     * @param {?} validatoinMessageProvider
     */
    function ControlMessagesComponent$$1(validatoinMessageProvider) {
        this.validatoinMessageProvider = validatoinMessageProvider;
    }
    Object.defineProperty(ControlMessagesComponent$$1.prototype, "errorMessage", {
        /**
         * @return {?}
         */
        get: function () {
            if (this.control) {
                for (var /** @type {?} */ propertyName in this.control.errors) {
                    if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                        return this.validatoinMessageProvider.getValidationMessage(propertyName, this.control.errors[propertyName]);
                    }
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return ControlMessagesComponent$$1;
}());
ControlMessagesComponent$$1.decorators = [
    { type: Component, args: [{
                selector: 'ff-control-messages',
                template: "<div class=\"control-message\" *ngIf=\"errorMessage !== null\">{{errorMessage}}</div>"
            },] },
];
/**
 * @nocollapse
 */
ControlMessagesComponent$$1.ctorParameters = function () { return [
    { type: ValidationMessageProvider, },
]; };
ControlMessagesComponent$$1.propDecorators = {
    'control': [{ type: Input },],
};

var FF_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return InputComponent; }),
    multi: true
};
var InputComponent = (function () {
    /**
     * @param {?} el
     */
    function InputComponent(el) {
        this.el = el;
        this.type = 'text';
        this.placeholder = '';
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
        this.isFocused = false;
        this.value = '';
        this.disabledSet = false;
        this.selector = el.nativeElement.localName;
    }
    Object.defineProperty(InputComponent.prototype, "disabled", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value !== false) {
                this.disabledSet = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    InputComponent.prototype.ngOnInit = function () {
        this.name = this.getFieldName();
    };
    /**
     * @return {?}
     */
    InputComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.selector === 'ff-textarea') {
            var /** @type {?} */ textarea_1 = this.el.nativeElement.querySelector('textarea');
            if (textarea_1) {
                setTimeout(function () {
                    _this.autoGrow(textarea_1);
                }, 1);
            }
        }
    };
    /**
     * @return {?}
     */
    InputComponent.prototype.getFieldName = function () {
        var /** @type {?} */ parent = this.formControl ? this.formControl['_parent'] : null;
        if (!parent) {
            return;
        }
        var /** @type {?} */ siblings = Object.keys(parent.controls);
        for (var /** @type {?} */ i = 0; i < siblings.length; i++) {
            var /** @type {?} */ key = siblings[i];
            if (parent.controls[key] == this.formControl) {
                return key;
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    InputComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * @return {?}
     */
    InputComponent.prototype.onChange = function () {
        this.onChangeCallback(this.value);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    InputComponent.prototype.onFocus = function (event) {
        this.focus.next(event);
        this.isFocused = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    InputComponent.prototype.onBlur = function (event) {
        this.blur.next(event);
        this.isFocused = false;
        this.onTouchedCallback();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    InputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    InputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    InputComponent.prototype.autoGrow = function (element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    };
    return InputComponent;
}());
InputComponent.decorators = [
    { type: Component, args: [{
                selector: 'ff-input,ff-textarea',
                template: "\n        <label *ngIf=\"label\">{{ label }}</label>\n\n        <textarea\n                *ngIf=\"selector == 'ff-textarea'\"\n                [placeholder]=\"placeholder\"\n                [attr.name]=\"name\"\n                [(ngModel)]=\"value\"\n                (blur)=\"onBlur($event)\"\n                (focus)=\"onFocus($event)\"\n                (ngModelChange)=\"onChange()\"\n                [tabindex]=\"tabindex ? tabindex : null\"\n                [attr.disabled]=\"disabledSet ? true : null\"\n                (input)=\"autoGrow($event.target)\"\n        ></textarea>\n\n        <input\n                *ngIf=\"type == 'date' && selector == 'ff-input'\"\n                ff-datepicker\n                type=\"text\"\n                [placeholder]=\"placeholder\"\n                [attr.name]=\"name\"\n                [(ngModel)]=\"value\"\n                (blur)=\"onBlur($event)\"\n                (focus)=\"onFocus($event)\"\n                [attr.disabled]=\"disabledSet ? true : null\"\n                (ngModelChange)=\"onChange()\"\n                [tabindex]=\"tabindex\">\n\n        <input\n                *ngIf=\"type != 'date' && type != 'money' && selector == 'ff-input'\"\n                [type]=\"type\"\n                [placeholder]=\"placeholder\"\n                [attr.name]=\"name\"\n                [(ngModel)]=\"value\"\n                (blur)=\"onBlur($event)\"\n                (focus)=\"onFocus($event)\"\n                [attr.disabled]=\"disabledSet ? true : null\"\n                (ngModelChange)=\"onChange()\"\n                [tabindex]=\"tabindex ? tabindex : null\">\n\n        <input\n                ff-amount\n                *ngIf=\"type == 'money' && selector == 'ff-input'\"\n                [alwaysShowDecimals]=\"alwaysShowDecimals\"\n                [numberOfDecimals]=\"numberOfDecimals\"\n                type=\"text\"\n                [placeholder]=\"placeholder\"\n                [attr.name]=\"name\"\n                [(ngModel)]=\"value\"\n                (blur)=\"onBlur($event)\"\n                (focus)=\"onFocus($event)\"\n                [attr.disabled]=\"disabledSet ? true : null\"\n                (ngModelChange)=\"onChange()\"\n                [tabindex]=\"tabindex ? tabindex : null\">\n\n        <ff-control-messages *ngIf=\"formControl\" [control]=\"formControl\"></ff-control-messages>\n    ",
                providers: [FF_INPUT_CONTROL_VALUE_ACCESSOR],
                host: {
                    '[class.ff-focused]': 'isFocused',
                }
            },] },
];
/**
 * @nocollapse
 */
InputComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
InputComponent.propDecorators = {
    'type': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'formControl': [{ type: Input },],
    'label': [{ type: Input },],
    'alwaysShowDecimals': [{ type: Input },],
    'numberOfDecimals': [{ type: Input },],
    'tabindex': [{ type: Input },],
    'disabled': [{ type: Input },],
    'focus': [{ type: Output },],
    'blur': [{ type: Output },],
};

window['jQuery'] = window['$'] = $;
var SelectComponent = (function () {
    /**
     * @param {?} el
     */
    function SelectComponent(el) {
        this.el = el;
        this.valueKey = 'id';
        this.nameKey = 'name';
        this.selectedValueChange = new EventEmitter();
        this.enableSearchField = true;
        this.disabledSet = false;
        this.isFocused = false;
        this.isOpen = false;
    }
    Object.defineProperty(SelectComponent.prototype, "disabled", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.disabledSet = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ emit = false;
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
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnChanges = function () {
        this.updateValue();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.select = this.el.nativeElement.querySelector('select');
        this.$select = $(this.select).chosen({
            no_results_text: 'Keine Ergebnisse für',
            disable_search: !this.enableSearchField
        });
        this.$select.change(function (e, params) {
            var /** @type {?} */ value = params.selected;
            if (value === '') {
                value = null;
            }
            _this.selectedValue = value;
            _this.onChange();
        });
        this.updateValue();
        this.$select.on('chosen:showing_dropdown chosen:hiding_dropdown', function (e) {
            var /** @type {?} */ chosen_container = $(e.target).next('.chosen-container'), /** @type {?} */ classState = e.type == 'chosen:showing_dropdown' && dropdownExceedsBottomViewport();
            /**
             * @return {?}
             */
            function dropdownExceedsBottomViewport() {
                var /** @type {?} */ dropdown = chosen_container.find('.chosen-drop'), /** @type {?} */ dropdown_top = dropdown.offset().top - document.documentElement.scrollTop, /** @type {?} */ dropdown_height = dropdown.height(), /** @type {?} */ viewport_height = document.documentElement.clientHeight;
                return dropdown_top + dropdown_height > viewport_height;
            }
            chosen_container.toggleClass('chosen-drop-up', classState);
        });
        var /** @type {?} */ $chosenSingle = this.$select.find('.chosen-search-input');
        $chosenSingle.on('focus', function () {
            _this.isFocused = true;
        });
        $chosenSingle.on('blur', function () {
            _this.isFocused = false;
        });
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.updateValue = function () {
        if (this.$select) {
            this.$select.val(this.selectedValue).trigger('chosen:updated');
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnDestroy = function () {
        this.$select.chosen('destroy');
    };
    /**
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.getValue = function (option) {
        var /** @type {?} */ value = option[this.valueKey];
        return (value === undefined || value === null) ? '' : value;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SelectComponent.prototype.getValueForIndex = function (index) {
        return this.getValue(this.options[index]);
    };
    /**
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.getName = function (option) {
        return option[this.nameKey] || this.getValue(option);
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.onChange = function () {
        this.selectedValueChange.emit(this.selectedValue);
    };
    return SelectComponent;
}());
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ff-select',
                template: "\n        <label *ngIf=\"label\">{{ label }}</label>\n        <select #s class=\"{{ class }}\" [disabled]=\"disabledSet\">\n            <option\n                    *ngFor=\"let option of options\"\n                    [attr.value]=\"getValue(option)\">{{ getName(option) }}\n            </option>\n        </select>",
                host: {
                    '[class.ff-focused]': 'isFocused',
                }
            },] },
];
/**
 * @nocollapse
 */
SelectComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
SelectComponent.propDecorators = {
    'options': [{ type: Input },],
    'valueKey': [{ type: Input },],
    'nameKey': [{ type: Input },],
    'class': [{ type: Input },],
    'disabled': [{ type: Input },],
    'selectedValue': [{ type: Input },],
    'selectedValueChange': [{ type: Output },],
    'label': [{ type: Input },],
    'enableSearchField': [{ type: Input },],
};

var ModalService = (function () {
    /**
     * @param {?} componentFactoryResolver
     */
    function ModalService(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.activeInstances = 0;
    }
    /**
     * @return {?}
     */
    ModalService.prototype.hideCurrentModal = function () {
        this.placeholder.hide();
    };
    /**
     * @param {?} vcRef
     * @return {?}
     */
    ModalService.prototype.registerViewContainerRef = function (vcRef) {
        this.vcRef = vcRef;
    };
    /**
     * @param {?} placeholder
     * @return {?}
     */
    ModalService.prototype.registerPlaceholder = function (placeholder) {
        this.placeholder = placeholder;
    };
    /**
     * @param {?} injector
     * @return {?}
     */
    ModalService.prototype.registerInjector = function (injector) {
        this.injector = injector;
    };
    /**
     * @param {?} title
     * @param {?} message
     * @param {?} onCancel
     * @param {?} onConfirm
     * @return {?}
     */
    ModalService.prototype.createConfirmRequest = function (title, message, onCancel, onConfirm) {
        this.create(ConfirmComponent, {
            parameters: {
                title: title,
                message: message,
                onCancel: onCancel,
                onConfirm: onConfirm
            }
        });
    };
    /**
     * @template T
     * @param {?} component
     * @param {?=} options
     * @return {?}
     */
    ModalService.prototype.create = function (component, options) {
        options = Object.assign({}, {
            size: ModalSize.Regular,
            padding: false,
            clean: false,
            showCloseButton: true
        }, options);
        var /** @type {?} */ factory = this.componentFactoryResolver.resolveComponentFactory(component);
        return this.createFromFactory(factory, options);
    };
    /**
     * @template T
     * @param {?} componentFactory
     * @param {?} options
     * @return {?}
     */
    ModalService.prototype.createFromFactory = function (componentFactory, options) {
        this.placeholder.show();
        var /** @type {?} */ componentRef$ = new ReplaySubject();
        var /** @type {?} */ childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
        var /** @type {?} */ componentRef = this.vcRef.createComponent(componentFactory, 0, childInjector);
        // pass the @Input parameters to the instance
        Object.assign(componentRef.instance, options.parameters);
        this.placeholder.padding = options.padding;
        this.placeholder.modalSize = options.size;
        this.placeholder.clean = options.clean;
        this.placeholder.showCloseButton = options.showCloseButton;
        this.placeholder.registerComponentRef(componentRef);
        componentRef$.next(componentRef);
        componentRef$.complete();
        return componentRef$.asObservable();
    };
    return ModalService;
}());
ModalService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ModalService.ctorParameters = function () { return [
    { type: ComponentFactoryResolver, },
]; };

var ModalPlaceholderComponent = (function () {
    /**
     * @param {?} modalService
     * @param {?} injector
     */
    function ModalPlaceholderComponent(modalService, injector) {
        this.modalService = modalService;
        this.injector = injector;
        this.isShown = false;
        this.padding = false;
        this.modalSize = ModalSize.Regular;
        this.clean = false;
        this.showCloseButton = true;
    }
    Object.defineProperty(ModalPlaceholderComponent.prototype, "state", {
        /**
         * @return {?}
         */
        get: function () {
            return this.isShown ? 'shown' : 'hidden';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.ngOnInit = function () {
        this.modalService.registerInjector(this.injector);
        this.modalService.registerPlaceholder(this);
    };
    /**
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.ngAfterViewInit = function () {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
    };
    /**
     * @param {?} componentRef
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.registerComponentRef = function (componentRef) {
        this.componentRef = componentRef;
    };
    /**
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.isLarge = function () {
        return this.modalSize == ModalSize.Large;
    };
    /**
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.isFullWidth = function () {
        return this.modalSize == ModalSize.FullWidth;
    };
    /**
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.isClean = function () {
        return this.clean;
    };
    /**
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.onBackdropClicked = function () {
        this.hide();
    };
    /**
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.show = function () {
        this.isShown = true;
        var /** @type {?} */ body = document.querySelector('body');
        body.className += ' no-scroll';
    };
    /**
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.hide = function () {
        this.isShown = false;
        this.unlockBodyScroll();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.modalAnimationDone = function (event) {
        if (event.toState === 'hidden' && this.componentRef) {
            this.componentRef.destroy();
        }
    };
    /**
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.unlockBodyScroll = function () {
        this.removeClass(document.querySelector('body'), 'no-scroll');
    };
    /**
     * @param {?} element
     * @param {?} clazz
     * @return {?}
     */
    ModalPlaceholderComponent.prototype.removeClass = function (element, clazz) {
        var /** @type {?} */ newClassName = "";
        var /** @type {?} */ i;
        var /** @type {?} */ classes = element.className.split(" ");
        for (i = 0; i < classes.length; i++) {
            if (classes[i] !== clazz) {
                newClassName += classes[i] + " ";
            }
        }
        element.className = newClassName;
    };
    return ModalPlaceholderComponent;
}());
ModalPlaceholderComponent.decorators = [
    { type: Component, args: [{
                selector: "ff-modal-placeholder",
                template: "\n        <div class=\"modal-outer\" [@modalOuter]=\"state\">\n            <div [@modal]=\"state\" (@modal.done)=\"modalAnimationDone($event)\" tabindex=\"1\" class=\"modal\"\n                 [class.modal--no-padding]=\"!padding\"\n                 [class.modal--large]=\"isLarge()\"\n                 [class.modal--full-width]=\"isFullWidth()\"\n                 [class.modal--clean]=\"isClean()\">\n                <div class=\"modal-dialog\">\n                    <div class=\"modal-dialog__inner\">\n                        <ng-template #modalplaceholder></ng-template>\n                        <nvry-button *ngIf=\"showCloseButton && !clean\" class=\"button--clear modal__close-button-inside\"\n                                     (click)=\"hide()\">\n                            <nvry-icon name=\"cross\"></nvry-icon>\n                        </nvry-button>\n                    </div>\n                </div>\n            </div>\n            <div [@backdrop]=\"state\" class=\"modal-backdrop\" (click)=\"onBackdropClicked()\"></div>\n            <button ff-button *ngIf=\"showCloseButton && clean\" class=\"modal__close-button\" [@closeButton]=\"state\"\n                         (click)=\"hide()\">\n                <ff-icon name=\"cross\"></ff-icon>\n            </button>\n        </div>\n    ",
                animations: [
                    trigger('modalOuter', [
                        state('shown', style({ display: 'flex' })),
                        state('hidden', style({ display: 'none' })),
                        transition('hidden <=> shown', [
                            animate('0.2s ease')
                        ])
                    ]),
                    trigger('modal', [
                        state('shown', style({ transform: 'scale3d(1, 1, 1)', opacity: 1, display: 'block' })),
                        state('hidden', style({ transform: 'scale3d(0.7, 0.7, 0.7)', opacity: 0 })),
                        transition('hidden <=> shown', [
                            animate('0.2s ease')
                        ])
                    ]),
                    trigger('backdrop', [
                        state('shown', style({ opacity: 1, display: 'block' })),
                        state('hidden', style({ opacity: 0, display: 'none' })),
                        transition('hidden <=> shown', [
                            animate('0.2s ease')
                        ])
                    ]),
                    trigger('closeButton', [
                        state('shown', style({ opacity: 1, display: 'block' })),
                        state('hidden', style({ opacity: 0, display: 'none' })),
                        transition('hidden <=> shown', [
                            animate('0.1s ease')
                        ])
                    ])
                ],
                host: { 'class': 'modal-placeholder' }
            },] },
];
/**
 * @nocollapse
 */
ModalPlaceholderComponent.ctorParameters = function () { return [
    { type: ModalService, },
    { type: Injector, },
]; };
ModalPlaceholderComponent.propDecorators = {
    'viewContainerRef': [{ type: ViewChild, args: ["modalplaceholder", { read: ViewContainerRef },] },],
};
var ModalSize = {};
ModalSize.Regular = ('regular');
ModalSize.Large = ('large');
ModalSize.FullWidth = ('fullwidth');
ModalSize[ModalSize.Regular] = "Regular";
ModalSize[ModalSize.Large] = "Large";
ModalSize[ModalSize.FullWidth] = "FullWidth";

var DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DatePickerDirective; }),
    multi: true
};
var DatePickerDirective = (function () {
    /**
     * @param {?} el
     */
    function DatePickerDirective(el) {
        this.el = el;
        this.onChangeCallback = function () {
        };
        this.format = 'DD.MM.YYYY';
        this.onTouched = function () {
        };
    }
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.ngOnDestroy = function () {
        this.picker.destroy();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DatePickerDirective.prototype.writeValue = function (value) {
        if (value == undefined) {
            value = new Date();
        }
        this.picker.setDate(value);
        this.onChange();
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.onChange = function () {
        var /** @type {?} */ val = this.el.nativeElement.value;
        var /** @type {?} */ momentInstance = moment(val, this.format);
        if (momentInstance.isValid()) {
            val = momentInstance.format('YYYY-MM-DD');
        }
        this.onChangeCallback(val);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DatePickerDirective.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DatePickerDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return DatePickerDirective;
}());
DatePickerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[ff-datepicker]',
                providers: [DATEPICKER_VALUE_ACCESSOR],
                host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
            },] },
];
/**
 * @nocollapse
 */
DatePickerDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FFCoreModule = (function () {
    function FFCoreModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    FFCoreModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: FFCoreModule,
            providers: [
                config.validationMessageProvider || { provide: ValidationMessageProvider, useClass: FakeValidationMessageProvider },
            ]
        };
    };
    return FFCoreModule;
}());
FFCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [BrowserModule, FFMaterialModule],
                declarations: [
                    IconComponent,
                    ButtonComponent,
                    SpinnerComponent,
                    ConfirmComponent,
                    ControlMessagesComponent$$1,
                    InputComponent,
                    SelectComponent,
                ],
                exports: [
                    IconComponent,
                    ButtonComponent,
                    SpinnerComponent,
                    ConfirmComponent,
                    ControlMessagesComponent$$1,
                    InputComponent,
                    SelectComponent,
                ],
            },] },
];
/**
 * @nocollapse
 */
FFCoreModule.ctorParameters = function () { return []; };
/**
 * @abstract
 */
var ValidationMessageProvider = (function () {
    function ValidationMessageProvider() {
    }
    /**
     * @abstract
     * @param {?} validatorName
     * @param {?=} validatorValue
     * @return {?}
     */
    ValidationMessageProvider.prototype.getValidationMessage = function (validatorName, validatorValue) { };
    return ValidationMessageProvider;
}());
var FakeValidationMessageProvider = (function (_super) {
    __extends(FakeValidationMessageProvider, _super);
    function FakeValidationMessageProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} validatorName
     * @param {?=} validatorValue
     * @return {?}
     */
    FakeValidationMessageProvider.prototype.getValidationMessage = function (validatorName, validatorValue) {
        return '';
    };
    return FakeValidationMessageProvider;
}(ValidationMessageProvider));
FakeValidationMessageProvider.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FakeValidationMessageProvider.ctorParameters = function () { return []; };

export { FFCoreModule, ValidationMessageProvider, FakeValidationMessageProvider, ButtonComponent, ConfirmComponent, ControlMessagesComponent$$1 as ControlMessagesComponent, IconComponent, FF_INPUT_CONTROL_VALUE_ACCESSOR, InputComponent, FFMaterialModule, ModalPlaceholderComponent, ModalSize, SelectComponent, SpinnerComponent, ModalService, DATEPICKER_VALUE_ACCESSOR, DatePickerDirective };
