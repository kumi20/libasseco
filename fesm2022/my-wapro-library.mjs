import * as i0 from '@angular/core';
import { Injectable, Component, forwardRef, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, Output, ViewChild, signal, Input, HostListener } from '@angular/core';
import * as i3 from '@angular/common';
import { DatePipe, CommonModule } from '@angular/common';
import * as i1 from 'devextreme-angular';
import { DxDateBoxModule, DxTooltipModule, DxButtonModule, DxListModule } from 'devextreme-angular';
import * as i4 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i3$1 from 'devextreme-angular/ui/nested';
import * as i2 from 'devextreme-angular/core';

class MyWaproLibraryService {
    constructor() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MyWaproLibraryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MyWaproLibraryService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MyWaproLibraryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class MyWaproLibraryComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MyWaproLibraryComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MyWaproLibraryComponent, isStandalone: true, selector: "lib-my-wapro-library", ngImport: i0, template: `
    <p>
      my-wapro-library works!
    </p>
  `, isInline: true, styles: [""] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MyWaproLibraryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-my-wapro-library', standalone: true, imports: [], template: `
    <p>
      my-wapro-library works!
    </p>
  ` }]
        }] });

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WaproDateBoxComponent),
    multi: true,
};
const TOOLTIP_DELAY$1 = 600;
class WaproDateBoxComponent {
    get myValue() {
        return this._value;
    }
    set myValue(v) {
        if (v !== this._value) {
            this._value = v;
            try {
                this.onChange(v);
            }
            catch { }
        }
    }
    constructor(cd) {
        this.cd = cd;
        this.onValueChanged = new EventEmitter();
        this.focusedOut = new EventEmitter();
        this.focusedIn = new EventEmitter();
        this.noMaxWidth = false;
        this.width = null;
        this._value = '';
        this.displayFormat = '';
        this.readOnly = false;
        this.type = 'date';
        this.disabled = false;
        this.errorClass = false;
        this.BLError = false;
        this.BLWarning = false;
        this.isHover = false;
        this.isFocus = false;
        this.plusBtn = {
            icon: 'icon absui-icon--add',
            stylingMode: 'text',
            onClick: () => {
                this.addDay();
            },
        };
        this.minusBtn = {
            icon: 'icon absui-icon--remove',
            stylingMode: 'text',
            onClick: () => {
                this.subtractDay();
            },
        };
        this.opened = false;
        this.notOpen = false;
        this.calendarBtn = {
            icon: 'icon absui-icon--calendar-month-unselect',
            elementAttr: { 'data-cy': 'calendar-btn-open' },
            stylingMode: 'text',
            tabIndex: -1,
            onClick: () => {
                this.opened = !this.opened;
                this.cd.detectChanges();
            },
        };
        this.changeByUser = false;
        this.tooltipShowEvent = { name: 'dxhoverstart', delay: TOOLTIP_DELAY$1 };
        this.addDay = () => {
            if (this.myValue == null ||
                this.myValue == undefined ||
                this.myValue == '') {
                this.myValue = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
            }
            let newDate = new DatePipe('en-US').transform(new Date(this.myValue).getTime() + 1 * 1000 * 60 * 60 * 24, 'yyyy-MM-ddTHH:mm:ss');
            this.changeByUser = true;
            this.myValue = newDate;
            this.cd.detectChanges();
        };
        this.openBox = () => {
            if (!this.notOpen) {
                this.opened = !this.opened;
            }
        };
        this.onOpened = () => {
            this.notOpen = true;
        };
        this.onClosed = () => {
            setTimeout(() => {
                this.notOpen = false;
            }, 500);
        };
        this.onValueChangedDate = (e) => {
            if (this.type != 'datetime' && !this.areDatesEqual(e)) {
                this.opened = false;
                this.cd.detectChanges();
            }
            const event = { ...e };
            if (!event.event) {
                event.event = {};
            }
            this.onValueChanged.emit(event);
            this.changeByUser = false;
        };
        this.onBlur = (e) => {
            e.element.classList.remove('dx-state-focused');
        };
        this.subtractDay = () => {
            if (this.myValue == null ||
                this.myValue == undefined ||
                this.myValue == '') {
                this.myValue = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
            }
            let newDate = new DatePipe('en-US').transform(new Date(this.myValue).getTime() - 1 * 1000 * 60 * 60 * 24, 'yyyy-MM-ddTHH:mm:ss');
            this.changeByUser = true;
            this.myValue = newDate;
            this.cd.detectChanges();
        };
        this.keydown = (e) => {
            if (!this.readOnly) {
                const originalEvent = e.event.originalEvent;
                if (originalEvent.code == 'ArrowDown' && originalEvent.shiftKey)
                    this.subtractDay();
                if (originalEvent.code == 'ArrowUp' && originalEvent.shiftKey)
                    this.addDay();
                this.cd.detectChanges();
            }
        };
        this.mouseover = () => {
            this.isHover = true;
        };
        this.mouseout = () => {
            this.isHover = false;
        };
        this.onFocusIn = () => {
            this.isFocus = true;
            this.focusedIn.emit(true);
        };
        this.onFocusOut = () => {
            this.isFocus = false;
            this.focusedOut.emit(true);
        };
        this.onChange = (_) => { };
        this.onTouched = () => { };
        if (!this.displayFormat)
            this.displayFormat = 'yyyy-MM-dd';
        if (!this.type)
            this.type = 'date';
        if (!this.disabled)
            this.disabled = false;
        this.calendarOptions = {
            onContentReady: (e) => {
                setTimeout(function () {
                    e.component.option('inputAttr', { readonly: true });
                }, 500);
                let todayBtn = this.dateBox.element.nativeElement.getElementsByClassName('dx-button-today')[0];
                if (this.type != 'datetime') {
                    let buttonDone = document.getElementsByClassName('dx-widget dx-button dx-button-mode-contained dx-button-normal dx-button-has-text dx-popup-done');
                    let buttonCancel = document.getElementsByClassName('dx-widget dx-button dx-button-mode-contained dx-button-normal dx-button-has-text dx-popup-cancel');
                    for (let i = 0; i < buttonDone.length; i++) {
                        buttonDone[i].classList.add('disabledBtn');
                    }
                    for (let i = 0; i < buttonCancel.length; i++) {
                        buttonCancel[i].classList.add('disabledBtn');
                    }
                    e.element.onclick = () => {
                        let newDate = new DatePipe('en-US').transform(e.component.option('value'), 'yyyy-MM-ddTHH:mm:ss');
                        this.changeByUser = true;
                        this.myValue = newDate;
                        this.cd.detectChanges();
                    };
                }
                todayBtn.onclick = () => {
                    let newDate = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
                    this.changeByUser = true;
                    this.myValue = newDate;
                    this.opened = false;
                    this.cd.detectChanges();
                };
            },
        };
    }
    areDatesEqual(e) {
        if (!e.value || (e.value && !e.previousValue)) {
            return false;
        }
        try {
            const currentValue = new DatePipe('en-US').transform(new Date(e.value), this.displayFormat);
            const previousFormattedValue = new DatePipe('en-US').transform(new Date(e.previousValue), this.displayFormat);
            return currentValue === previousFormattedValue;
        }
        catch {
            return false;
        }
    }
    writeValue(value) {
        this.myValue = value;
        this.cd.detectChanges();
    }
    registerOnChange(fn) {
        this.onChange = fn;
        this.cd.detectChanges();
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
        this.cd.detectChanges();
    }
    setDisabledState(_isDisabled) {
        //throw new Error('Method not implemented.');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: WaproDateBoxComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: WaproDateBoxComponent, isStandalone: true, selector: "wapro-date-box", inputs: { displayFormat: "displayFormat", readOnly: "readOnly", type: "type", disabled: "disabled", errorClass: "errorClass", width: "width", noMaxWidth: "noMaxWidth", BLWarning: "BLWarning", BLError: "BLError", opened: "opened" }, outputs: { onValueChanged: "onValueChanged", focusedOut: "focusedOut", focusedIn: "focusedIn" }, providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR], viewQueries: [{ propertyName: "dateBox", first: true, predicate: ["dateBox"], descendants: true }], ngImport: i0, template: "<dx-date-box\r\n  [(value)]=\"myValue\"\r\n  [type]=\"type\"\r\n  [displayFormat]=\"displayFormat\"\r\n  [width]=\"width || 276\"\r\n  class=\"wapro-date-box\"\r\n  [readOnly]=\"readOnly\"\r\n  [disabled]=\"disabled\"\r\n  (mouseover)=\"mouseover()\"\r\n  (mouseout)=\"mouseout()\"\r\n  (onFocusIn)=\"onFocusIn()\"\r\n  (onFocusOut)=\"onFocusOut()\"\r\n  (onValueChanged)=\"onValueChangedDate($event)\"\r\n  (onEnterKey)=\"openBox()\"\r\n  (onOpened)=\"onOpened()\"\r\n  (onClosed)=\"onClosed()\"\r\n  [(opened)]=\"opened\"\r\n  [ngClass]=\"{\r\n    BLError: BLError,\r\n    'input-required': errorClass,\r\n    'date-hover': isHover,\r\n    'no-max-width': noMaxWidth\r\n  }\"\r\n  [id]=\"BLError ? 'dateBoxError' : null\"\r\n  #dateBox\r\n  (onKeyDown)=\"keydown($event)\"\r\n  (onBlur)=\"onBlur($event)\"\r\n  applyValueMode=\"useButtons\"\r\n  valueChangeEvent=\"change blur focusout\"\r\n  [calendarOptions]=\"calendarOptions\"\r\n  [useMaskBehavior]=\"true\"\r\n  [inputAttr]=\"{ 'aria-label': 'Date Time' }\"\r\n>\r\n  <dxi-button\r\n    name=\"calendar\"\r\n    location=\"before\"\r\n    [options]=\"calendarBtn\"\r\n  ></dxi-button>\r\n  <dxi-button\r\n    name=\"minus\"\r\n    location=\"after\"\r\n    cssClass=\"myClass\"\r\n    [options]=\"minusBtn\"\r\n    class=\"wapro-btn-date\"\r\n    *ngIf=\"type != 'time'\"\r\n  ></dxi-button>\r\n  <dxi-button\r\n    name=\"plus\"\r\n    location=\"after\"\r\n    [options]=\"plusBtn\"\r\n    style=\"border-radius: 6px; height: 21px\"\r\n    *ngIf=\"type != 'time'\"\r\n  ></dxi-button>\r\n</dx-date-box>\r\n\r\n<i\r\n  style=\"position: absolute; cursor: pointer; top: -1px; right: 4px\"\r\n  *ngIf=\"BLWarning\"\r\n  class=\"icon absui-icon--warning2 icon-warning-box\"\r\n  [id]=\"'BLWarning'\"\r\n>\r\n</i>\r\n\r\n<i\r\n  style=\"position: absolute; cursor: pointer; top: -1px; right: 4px\"\r\n  *ngIf=\"BLError\"\r\n  class=\"icon absui-icon--error-outline icon-error-box\"\r\n  [id]=\"'BLError'\"\r\n>\r\n</i>\r\n", styles: [".btn-box{width:49px;height:28px;padding-top:1.5px;padding-bottom:1.5px;box-sizing:border-box;border:1px solid var(--neutral-50, #b3b3b3);border-left:none;border-radius:0 6px 6px 0;display:inline-block}.dx-calendar-cell.dx-calendar-contoured-date span{box-shadow:0 0 0 2px var(--brand-10, #bc1a22)}.dx-calendar-cell.dx-state-hover span{background-color:var(--neutral-85,#ededed);color:var(--neutral-10, #000000)}.dx-calendar-cell.dx-calendar-selected-date span{color:var(--neutral-100, #ffffff);background-color:var(--brand-10, #bc1a22)}.dx-calendar-cell.dx-calendar-today span{border:2px solid var(--brand-10,#bc1a22)}.dx-calendar-cell.dx-calendar-selected-date,.dx-calendar-cell.dx-calendar-selected-date.dx-calendar-today{color:var(--neutral-100, #ffffff);box-shadow:inset 0 0 0 1000px transparent!important;font-weight:400}.date-hover{border:1px solid var(--neutral-30,#4c4c4c)!important}.btn-box-hover{width:49px;height:28px;padding-top:1.5px;padding-bottom:1.5px;box-sizing:border-box;border:1px solid var(--neutral-30, #4c4c4c);border-left:none;border-radius:0 6px 6px 0;display:inline-block}.on-focus{box-shadow:0 0 8px #58636a4d;border-radius:4px}.plus-btn{box-sizing:border-box;padding:3px;height:21px;position:relative;width:22px;top:1px;cursor:pointer;float:left;margin-left:2px}.plus-btn:hover{background:var(--neutral-85, #ededed);border-radius:4px}.minus-btn{box-sizing:border-box;padding:3px;height:21px;position:relative;width:22px;top:1px;cursor:pointer;float:left}.minus-btn:hover{background:var(--neutral-85, #ededed);border-radius:4px}.absui-icon--calendar-month-unselect:before{content:\"\\eb0d\";font-size:16px;line-height:16px;color:var(--neutral-30, #4c4c4c);position:absolute;top:5px;left:4px}.absui-icon--add:before{content:\"\\e145\";font-size:16px;line-height:16px;color:var(--neutral-30, #4c4c4c);position:absolute;top:5px;right:5px}.absui-icon--remove:before{content:\"\\e15b\";font-size:16px;line-height:16px;color:var(--neutral-30, #4c4c4c);position:absolute;top:5px;right:26px}.wapro-date-box{display:inline-block;position:relative;padding-left:2px}.wapro-date-box.dx-widget input,.dx-widget textarea{font-family:Roboto;padding-top:8px;padding-left:2px;font-size:.75rem;line-height:16px;color:var(--neutral-30, #4c4c4c)}.wapro-date-box .dx-texteditor-buttons-container>.dx-button.dx-button-has-icon:not(.dx-button-has-text)>.dx-button-content{padding:6px;height:20px;width:18px}.dx-button-mode-text.dx-state-hover,.dx-button-mode-text.dx-state-focused{background-color:var(--neutral-85, #ededed);border-radius:4px}.dx-button-content{margin-left:1px}.no-max-width{max-width:none!important}.disabledBtn{display:none!important}:is() .dx-texteditor-buttons-container>.dx-button{margin:1px 3.5px 1px 1px;border-radius:6px;height:21px}.dx-texteditor.dx-editor-outlined{background:#fff;border:1px solid #ddd;border-radius:4px;height:28px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: DxDateBoxModule }, { kind: "component", type: i1.DxDateBoxComponent, selector: "dx-date-box", inputs: ["acceptCustomValue", "accessKey", "activeStateEnabled", "adaptivityEnabled", "applyButtonText", "applyValueMode", "buttons", "calendarOptions", "cancelButtonText", "dateOutOfRangeMessage", "dateSerializationFormat", "deferRendering", "disabled", "disabledDates", "displayFormat", "dropDownButtonTemplate", "dropDownOptions", "elementAttr", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "interval", "invalidDateMessage", "isDirty", "isValid", "label", "labelMode", "max", "maxLength", "min", "name", "opened", "openOnFieldClick", "pickerType", "placeholder", "readOnly", "rtlEnabled", "showAnalogClock", "showClearButton", "showDropDownButton", "spellcheck", "stylingMode", "tabIndex", "text", "todayButtonText", "type", "useMaskBehavior", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChangeEvent", "visible", "width"], outputs: ["onChange", "onClosed", "onContentReady", "onCopy", "onCut", "onDisposing", "onEnterKey", "onFocusIn", "onFocusOut", "onInitialized", "onInput", "onKeyDown", "onKeyUp", "onOpened", "onOptionChanged", "onPaste", "onValueChanged", "acceptCustomValueChange", "accessKeyChange", "activeStateEnabledChange", "adaptivityEnabledChange", "applyButtonTextChange", "applyValueModeChange", "buttonsChange", "calendarOptionsChange", "cancelButtonTextChange", "dateOutOfRangeMessageChange", "dateSerializationFormatChange", "deferRenderingChange", "disabledChange", "disabledDatesChange", "displayFormatChange", "dropDownButtonTemplateChange", "dropDownOptionsChange", "elementAttrChange", "focusStateEnabledChange", "heightChange", "hintChange", "hoverStateEnabledChange", "inputAttrChange", "intervalChange", "invalidDateMessageChange", "isDirtyChange", "isValidChange", "labelChange", "labelModeChange", "maxChange", "maxLengthChange", "minChange", "nameChange", "openedChange", "openOnFieldClickChange", "pickerTypeChange", "placeholderChange", "readOnlyChange", "rtlEnabledChange", "showAnalogClockChange", "showClearButtonChange", "showDropDownButtonChange", "spellcheckChange", "stylingModeChange", "tabIndexChange", "textChange", "todayButtonTextChange", "typeChange", "useMaskBehaviorChange", "validationErrorChange", "validationErrorsChange", "validationMessageModeChange", "validationMessagePositionChange", "validationStatusChange", "valueChange", "valueChangeEventChange", "visibleChange", "widthChange", "onBlur"] }, { kind: "component", type: i3$1.DxiButtonComponent, selector: "dxi-button", inputs: ["location", "name", "options", "cssClass", "disabled", "hint", "icon", "onClick", "template", "text", "visible"] }, { kind: "ngmodule", type: DxTooltipModule }, { kind: "ngmodule", type: TranslateModule }, { kind: "ngmodule", type: DxButtonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: WaproDateBoxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'wapro-date-box', inputs: [
                        'displayFormat',
                        'readOnly',
                        'type',
                        'disabled',
                        'errorClass',
                        'width',
                        'noMaxWidth',
                        'BLWarning',
                        'BLError',
                        'opened',
                    ], standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR], imports: [
                        CommonModule,
                        DxDateBoxModule,
                        DxTooltipModule,
                        TranslateModule,
                        DxButtonModule,
                    ], template: "<dx-date-box\r\n  [(value)]=\"myValue\"\r\n  [type]=\"type\"\r\n  [displayFormat]=\"displayFormat\"\r\n  [width]=\"width || 276\"\r\n  class=\"wapro-date-box\"\r\n  [readOnly]=\"readOnly\"\r\n  [disabled]=\"disabled\"\r\n  (mouseover)=\"mouseover()\"\r\n  (mouseout)=\"mouseout()\"\r\n  (onFocusIn)=\"onFocusIn()\"\r\n  (onFocusOut)=\"onFocusOut()\"\r\n  (onValueChanged)=\"onValueChangedDate($event)\"\r\n  (onEnterKey)=\"openBox()\"\r\n  (onOpened)=\"onOpened()\"\r\n  (onClosed)=\"onClosed()\"\r\n  [(opened)]=\"opened\"\r\n  [ngClass]=\"{\r\n    BLError: BLError,\r\n    'input-required': errorClass,\r\n    'date-hover': isHover,\r\n    'no-max-width': noMaxWidth\r\n  }\"\r\n  [id]=\"BLError ? 'dateBoxError' : null\"\r\n  #dateBox\r\n  (onKeyDown)=\"keydown($event)\"\r\n  (onBlur)=\"onBlur($event)\"\r\n  applyValueMode=\"useButtons\"\r\n  valueChangeEvent=\"change blur focusout\"\r\n  [calendarOptions]=\"calendarOptions\"\r\n  [useMaskBehavior]=\"true\"\r\n  [inputAttr]=\"{ 'aria-label': 'Date Time' }\"\r\n>\r\n  <dxi-button\r\n    name=\"calendar\"\r\n    location=\"before\"\r\n    [options]=\"calendarBtn\"\r\n  ></dxi-button>\r\n  <dxi-button\r\n    name=\"minus\"\r\n    location=\"after\"\r\n    cssClass=\"myClass\"\r\n    [options]=\"minusBtn\"\r\n    class=\"wapro-btn-date\"\r\n    *ngIf=\"type != 'time'\"\r\n  ></dxi-button>\r\n  <dxi-button\r\n    name=\"plus\"\r\n    location=\"after\"\r\n    [options]=\"plusBtn\"\r\n    style=\"border-radius: 6px; height: 21px\"\r\n    *ngIf=\"type != 'time'\"\r\n  ></dxi-button>\r\n</dx-date-box>\r\n\r\n<i\r\n  style=\"position: absolute; cursor: pointer; top: -1px; right: 4px\"\r\n  *ngIf=\"BLWarning\"\r\n  class=\"icon absui-icon--warning2 icon-warning-box\"\r\n  [id]=\"'BLWarning'\"\r\n>\r\n</i>\r\n\r\n<i\r\n  style=\"position: absolute; cursor: pointer; top: -1px; right: 4px\"\r\n  *ngIf=\"BLError\"\r\n  class=\"icon absui-icon--error-outline icon-error-box\"\r\n  [id]=\"'BLError'\"\r\n>\r\n</i>\r\n", styles: [".btn-box{width:49px;height:28px;padding-top:1.5px;padding-bottom:1.5px;box-sizing:border-box;border:1px solid var(--neutral-50, #b3b3b3);border-left:none;border-radius:0 6px 6px 0;display:inline-block}.dx-calendar-cell.dx-calendar-contoured-date span{box-shadow:0 0 0 2px var(--brand-10, #bc1a22)}.dx-calendar-cell.dx-state-hover span{background-color:var(--neutral-85,#ededed);color:var(--neutral-10, #000000)}.dx-calendar-cell.dx-calendar-selected-date span{color:var(--neutral-100, #ffffff);background-color:var(--brand-10, #bc1a22)}.dx-calendar-cell.dx-calendar-today span{border:2px solid var(--brand-10,#bc1a22)}.dx-calendar-cell.dx-calendar-selected-date,.dx-calendar-cell.dx-calendar-selected-date.dx-calendar-today{color:var(--neutral-100, #ffffff);box-shadow:inset 0 0 0 1000px transparent!important;font-weight:400}.date-hover{border:1px solid var(--neutral-30,#4c4c4c)!important}.btn-box-hover{width:49px;height:28px;padding-top:1.5px;padding-bottom:1.5px;box-sizing:border-box;border:1px solid var(--neutral-30, #4c4c4c);border-left:none;border-radius:0 6px 6px 0;display:inline-block}.on-focus{box-shadow:0 0 8px #58636a4d;border-radius:4px}.plus-btn{box-sizing:border-box;padding:3px;height:21px;position:relative;width:22px;top:1px;cursor:pointer;float:left;margin-left:2px}.plus-btn:hover{background:var(--neutral-85, #ededed);border-radius:4px}.minus-btn{box-sizing:border-box;padding:3px;height:21px;position:relative;width:22px;top:1px;cursor:pointer;float:left}.minus-btn:hover{background:var(--neutral-85, #ededed);border-radius:4px}.absui-icon--calendar-month-unselect:before{content:\"\\eb0d\";font-size:16px;line-height:16px;color:var(--neutral-30, #4c4c4c);position:absolute;top:5px;left:4px}.absui-icon--add:before{content:\"\\e145\";font-size:16px;line-height:16px;color:var(--neutral-30, #4c4c4c);position:absolute;top:5px;right:5px}.absui-icon--remove:before{content:\"\\e15b\";font-size:16px;line-height:16px;color:var(--neutral-30, #4c4c4c);position:absolute;top:5px;right:26px}.wapro-date-box{display:inline-block;position:relative;padding-left:2px}.wapro-date-box.dx-widget input,.dx-widget textarea{font-family:Roboto;padding-top:8px;padding-left:2px;font-size:.75rem;line-height:16px;color:var(--neutral-30, #4c4c4c)}.wapro-date-box .dx-texteditor-buttons-container>.dx-button.dx-button-has-icon:not(.dx-button-has-text)>.dx-button-content{padding:6px;height:20px;width:18px}.dx-button-mode-text.dx-state-hover,.dx-button-mode-text.dx-state-focused{background-color:var(--neutral-85, #ededed);border-radius:4px}.dx-button-content{margin-left:1px}.no-max-width{max-width:none!important}.disabledBtn{display:none!important}:is() .dx-texteditor-buttons-container>.dx-button{margin:1px 3.5px 1px 1px;border-radius:6px;height:21px}.dx-texteditor.dx-editor-outlined{background:#fff;border:1px solid #ddd;border-radius:4px;height:28px}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { onValueChanged: [{
                type: Output
            }], dateBox: [{
                type: ViewChild,
                args: ['dateBox']
            }], focusedOut: [{
                type: Output
            }], focusedIn: [{
                type: Output
            }] } });

const TOOLTIP_DELAY = 600;
class CustomChipsButtonComponent {
    clickout() {
        if (!this.eRef.nativeElement.contains(event?.target)) {
            this.isChipsList.set(false);
        }
    }
    constructor(eRef, cd) {
        this.eRef = eRef;
        this.cd = cd;
        this.name = null;
        this.list = [];
        this.width = null;
        this.maxHeight = null;
        this.customDisplayValue = null;
        this.disabledClear = false;
        this.positionTop = '-2px';
        this.labelExpr = 'label';
        this.valueExpr = 'value';
        this.deleteFilter = false;
        this.appDateRangeChips = false;
        this.onValueChanged = new EventEmitter(); // zależy co jest zdefiniowane w list.value
        this.deviceType = 'desktop';
        this.unicalGuid = new Date().getTime() + Math.round(Math.random() * 10000);
        // isChipsList: boolean = false;
        this.isChipsList = signal(false);
        this.selectedValue = '';
        this.listHeight = null;
        this.tooltipShowEvent = { name: 'dxhoverstart', delay: TOOLTIP_DELAY };
        this.clearValue = () => {
            this.selectedValue = '';
            this.onValueChanged.emit('');
            this.isChipsList.set(false);
        };
        this.onItemClick = (e) => {
            if (e.itemData.value === null) {
                this.clearValue();
                return;
            }
            this.selectedValue = e.itemData[this.labelExpr];
            this.cd.detectChanges();
            this.onValueChanged.emit(e.itemData[this.valueExpr]);
            this.isChipsList.set(false);
        };
    }
    ngOnInit() {
        this.checkSelectedValue();
    }
    ngOnChanges(changes) {
        if (changes['selectedValueInput']?.previousValue &&
            !changes['selectedValueInput']?.currentValue) {
            this.selectedValue = '';
        }
        if (changes['deleteFilter']?.currentValue) {
            this.clearValue();
        }
        this.checkSelectedValue();
        if (changes['list']?.currentValue || changes['maxHeight']?.currentValue) {
            if (this.list.length && this.maxHeight) {
                const maxHeight = parseInt(this.maxHeight.toString());
                this.listHeight =
                    this.list.length * 30 > maxHeight ? maxHeight : 'auto';
            }
        }
    }
    checkSelectedValue() {
        if (this.selectedValueInput) {
            let val = this.list.find((filed) => filed[this.labelExpr] == this.selectedValueInput);
            if (val) {
                this.selectedValue = val[this.labelExpr];
            }
            else if (!val && this.customDisplayValue) {
                const found = this.list.find((filed) => filed[this.valueExpr] == 'custom');
                if (found) {
                    this.selectedValue = found[this.labelExpr];
                }
            }
            else if (!val && this.selectedValueInput === 'Niezapisany filtr') {
                this.selectedValue = 'Niezapisany filtr';
            }
        }
    }
    swapChipsList() {
        this.isChipsList.set(!this.isChipsList());
        setTimeout(() => { }, 100);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CustomChipsButtonComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: CustomChipsButtonComponent, isStandalone: true, selector: "app-custom-chips-button", inputs: { name: "name", list: "list", width: "width", maxHeight: "maxHeight", customDisplayValue: "customDisplayValue", selectedValueInput: "selectedValueInput", disabledClear: "disabledClear", positionTop: "positionTop", labelExpr: "labelExpr", valueExpr: "valueExpr", deleteFilter: "deleteFilter", appDateRangeChips: "appDateRangeChips", deviceType: "deviceType" }, outputs: { onValueChanged: "onValueChanged" }, host: { listeners: { "document:click": "clickout()" } }, viewQueries: [{ propertyName: "listRef", first: true, predicate: ["listRef"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div\r\n  *ngIf=\"!appDateRangeChips\"\r\n  style=\"\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    margin-right: 6px;\r\n    position: relative;\r\n    top: -2px;\r\n  \"\r\n  [ngStyle]=\"{ top: positionTop }\"\r\n  class=\"mobile-position\"\r\n>\r\n  <div\r\n    class=\"chips-btn\"\r\n    tabindex=\"0\"\r\n    (click)=\"swapChipsList()\"\r\n    (keydown.enter)=\"swapChipsList()\"\r\n    (keydown.space)=\"swapChipsList()\"\r\n    [ngClass]=\"{\r\n      'chips-btn-opened': isChipsList(),\r\n      'chips-selected': selectedValue != '' || customDisplayValue\r\n    }\"\r\n  >\r\n    <i style=\"height: 12px\"></i>\r\n    <p class=\"chips-btn-name\">{{ name }}</p>\r\n    <p\r\n      class=\"chips-btn-name\"\r\n      style=\"margin-right: 2px\"\r\n      *ngIf=\"selectedValue != '' || customDisplayValue\"\r\n    >\r\n      :\r\n    </p>\r\n    <p\r\n      class=\"chips-btn-selected\"\r\n      *ngIf=\"selectedValue != '' || customDisplayValue\"\r\n    >\r\n      {{ customDisplayValue || selectedValue }}\r\n    </p>\r\n    <i\r\n      class=\"icon absui-icon--multiplication\"\r\n      *ngIf=\"selectedValue != '' && !disabledClear\"\r\n      (click)=\"clearValue()\"\r\n    ></i>\r\n  </div>\r\n\r\n  <div\r\n    class=\"chips-list\"\r\n    *ngIf=\"isChipsList() && deviceType != 'mobile'\"\r\n    [ngClass]=\"{ 'mobile-chips-list': deviceType !== 'desktop' }\"\r\n  >\r\n    <dx-list\r\n      #listRef\r\n      [dataSource]=\"list\"\r\n      [searchEnabled]=\"false\"\r\n      (onItemClick)=\"onItemClick($event)\"\r\n      [width]=\"width ? width : 210\"\r\n      [height]=\"listHeight ? listHeight : 'auto'\"\r\n    >\r\n      <div\r\n        *dxTemplate=\"let item of 'item'\"\r\n        [ngClass]=\"{ 'selected-chip': item[labelExpr] == selectedValue }\"\r\n      >\r\n        {{ item[labelExpr] }}\r\n      </div>\r\n    </dx-list>\r\n  </div>\r\n</div>\r\n\r\n<!-- <app-mobile-list\r\n  [dataSource]=\"list\"\r\n  [visible]=\"isChipsList()\"\r\n  *ngIf=\"event.deviceType == 'mobile'\"\r\n  (onClosed)=\"isChipsList.set(false)\"\r\n  (onItemClick)=\"onItemClick($event)\"\r\n  [title]=\"name\"\r\n></app-mobile-list> -->\r\n\r\n<div\r\n  *ngIf=\"appDateRangeChips\"\r\n  style=\"\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    margin-right: 6px;\r\n    position: relative;\r\n    top: -2px;\r\n  \"\r\n  [ngStyle]=\"{ top: positionTop }\"\r\n  class=\"mobile-position\"\r\n>\r\n  <div\r\n    class=\"chips-btn\"\r\n    tabindex=\"0\"\r\n    (click)=\"swapChipsList()\"\r\n    (keydown.enter)=\"swapChipsList()\"\r\n    (keydown.space)=\"swapChipsList()\"\r\n    [ngClass]=\"{\r\n      'chips-btn-opened': isChipsList(),\r\n      'chips-selected': selectedValue != '' || customDisplayValue\r\n    }\"\r\n    [id]=\"'dateRangeFilter' + unicalGuid\"\r\n  >\r\n    <i style=\"height: 12px\"></i>\r\n    <p class=\"chips-btn-name\">{{ name }}</p>\r\n    <p\r\n      class=\"chips-btn-name\"\r\n      style=\"margin-right: 2px\"\r\n      *ngIf=\"selectedValue != '' || customDisplayValue\"\r\n    >\r\n      :\r\n    </p>\r\n    <p\r\n      class=\"chips-btn-selected\"\r\n      *ngIf=\"selectedValue != '' || customDisplayValue\"\r\n    >\r\n      {{ customDisplayValue || selectedValue }}\r\n    </p>\r\n    <i\r\n      class=\"icon absui-icon--multiplication\"\r\n      *ngIf=\"selectedValue != '' && !disabledClear\"\r\n      (click)=\"clearValue()\"\r\n    ></i>\r\n  </div>\r\n\r\n  <div\r\n    class=\"chips-list\"\r\n    *ngIf=\"isChipsList() && deviceType != 'mobile'\"\r\n    [ngClass]=\"{ 'mobile-chips-list': deviceType !== 'desktop' }\"\r\n  >\r\n    <dx-list\r\n      #listRef\r\n      [dataSource]=\"list\"\r\n      [searchEnabled]=\"false\"\r\n      (onItemClick)=\"onItemClick($event)\"\r\n      [width]=\"width ? width : 210\"\r\n      [height]=\"listHeight ? listHeight : 'auto'\"\r\n    >\r\n      <div\r\n        *dxTemplate=\"let item of 'item'\"\r\n        [ngClass]=\"{ 'selected-chip': item[labelExpr] == selectedValue }\"\r\n      >\r\n        {{ item[labelExpr] }}\r\n      </div>\r\n    </dx-list>\r\n  </div>\r\n</div>\r\n\r\n<div style=\"display: inline-block\">\r\n  <dx-tooltip\r\n    [target]=\"'#dateRangeFilter' + unicalGuid\"\r\n    hideEvent=\"dxhoverend\"\r\n    [hideOnOutsideClick]=\"true\"\r\n    [showEvent]=\"tooltipShowEvent\"\r\n  >\r\n    <div *dxTemplate=\"let data of 'content'\">\r\n      {{ \"tooltip.dateRangeFilter\" | translate }} (F9)\r\n    </div>\r\n  </dx-tooltip>\r\n</div>\r\n", styles: [":ng-host:focus{border:2px solid red!important}.chips-btn{width:auto;height:26px;background-color:var(--neutral-90, #f5f5f5)!important;border-radius:30px;padding:0 8px;display:inline-block;border:2px solid transparent!important;display:flex;justify-content:center;align-items:center}.chips-btn:hover{background-color:var(--neutral-85, #ededed)!important;border:2px solid transparent!important}.chips-btn:focus{background-color:var(--neutral-90, #f5f5f5)!important;border:2px solid var(--brand-neutral-10, #30393f)!important}.chips-selected{background-color:var(--theme-warning-90, #fef8eb)!important;border:2px solid var(--theme-warning-80, #fef1d7)!important}.chips-selected .chips-btn-name{color:var(--neutral-40, #666666)!important}.chips-selected b,.chips-selected .chips-btn-selected{color:var(--neutral-15, #222222)!important}.chips-selected:hover{border:2px solid var(--theme-warning-80, #fef1d7)!important;background-color:var(--theme-warning-80, #fef1d7)!important}.chips-selected:focus{background-color:var(--theme-warning-90, #fef8eb)!important;border:2px solid var(--brand-neutral-10, #30393f)!important}.clear-panel{border-top:1px solid var(--neutral-80, #e5e5e5);height:36px;margin-left:-5px;width:calc(100% + 10px)}.chips-btn-name{font-family:Roboto;font-style:normal;font-weight:400;font-size:.75rem;line-height:14px;color:var(--text-light-gray, #666666);display:inline-block;cursor:pointer;position:relative;margin:0;white-space:nowrap}.selected-chip{color:var(--brand-10, #bc1a22)!important;font-weight:500!important}.chips-btn-selected{font-family:Roboto;font-style:normal;font-weight:500;font-size:.75rem;line-height:14px;margin-left:2px;color:var(--neutral-10, #000000);display:inline-block;position:relative;margin-bottom:0;margin-top:0;top:0;white-space:nowrap}:host ::ng-deep .absui-icon--multiplication:before{font-size:14px!important;line-height:14px;color:var(--neutral-30, #4c4c4c);position:relative;left:7px;top:0;height:22px;display:inline-flex;width:22px;justify-content:center;align-items:center;border-radius:50%}:host ::ng-deep .absui-icon--multiplication:hover:before{background-color:var(--theme-warning-70, #fdeac4)!important;color:var(--text-brand, #bc1a22)!important}:host ::ng-deep .dx-list-item-content{font-family:Roboto;font-size:.75rem;line-height:10px;padding:10px 15px}.absui-icon--pin-classic:before{font-family:Lumen;content:\"\\e9ea\";display:inline-block;font-size:14px!important;line-height:14px;color:var(--text-light-gray, #666666);margin-right:5px;top:1px;position:relative}.chips-list{background:var(--neutral-100, #ffffff);box-sizing:border-box;border:1px solid var(--neutral-80, #e5e5e5);box-shadow:0 2px 1px #0000000f,0 4px 20px #0000001a;border-radius:8px;padding:5px;min-width:210px;width:auto;position:absolute;z-index:20}.chips-list.mobile-chips-list{position:fixed;margin-top:-10px}\n"], dependencies: [{ kind: "ngmodule", type: 
                // MobileListComponent,
                DxListModule }, { kind: "component", type: i1.DxListComponent, selector: "dx-list", inputs: ["accessKey", "activeStateEnabled", "allowItemDeleting", "bounceEnabled", "collapsibleGroups", "dataSource", "disabled", "displayExpr", "elementAttr", "focusStateEnabled", "grouped", "groupTemplate", "height", "hint", "hoverStateEnabled", "indicateLoading", "itemDeleteMode", "itemDragging", "itemHoldTimeout", "items", "itemTemplate", "keyExpr", "menuItems", "menuMode", "nextButtonText", "noDataText", "pageLoadingText", "pageLoadMode", "pulledDownText", "pullingDownText", "pullRefreshEnabled", "refreshingText", "repaintChangesOnly", "rtlEnabled", "scrollByContent", "scrollByThumb", "scrollingEnabled", "searchEditorOptions", "searchEnabled", "searchExpr", "searchMode", "searchTimeout", "searchValue", "selectAllMode", "selectAllText", "selectByClick", "selectedItemKeys", "selectedItems", "selectionMode", "showScrollbar", "showSelectionControls", "tabIndex", "useNativeScrolling", "visible", "width"], outputs: ["onContentReady", "onDisposing", "onGroupRendered", "onInitialized", "onItemClick", "onItemContextMenu", "onItemDeleted", "onItemDeleting", "onItemHold", "onItemRendered", "onItemReordered", "onItemSwipe", "onOptionChanged", "onPageLoading", "onPullRefresh", "onScroll", "onSelectAllValueChanged", "onSelectionChanged", "accessKeyChange", "activeStateEnabledChange", "allowItemDeletingChange", "bounceEnabledChange", "collapsibleGroupsChange", "dataSourceChange", "disabledChange", "displayExprChange", "elementAttrChange", "focusStateEnabledChange", "groupedChange", "groupTemplateChange", "heightChange", "hintChange", "hoverStateEnabledChange", "indicateLoadingChange", "itemDeleteModeChange", "itemDraggingChange", "itemHoldTimeoutChange", "itemsChange", "itemTemplateChange", "keyExprChange", "menuItemsChange", "menuModeChange", "nextButtonTextChange", "noDataTextChange", "pageLoadingTextChange", "pageLoadModeChange", "pulledDownTextChange", "pullingDownTextChange", "pullRefreshEnabledChange", "refreshingTextChange", "repaintChangesOnlyChange", "rtlEnabledChange", "scrollByContentChange", "scrollByThumbChange", "scrollingEnabledChange", "searchEditorOptionsChange", "searchEnabledChange", "searchExprChange", "searchModeChange", "searchTimeoutChange", "searchValueChange", "selectAllModeChange", "selectAllTextChange", "selectByClickChange", "selectedItemKeysChange", "selectedItemsChange", "selectionModeChange", "showScrollbarChange", "showSelectionControlsChange", "tabIndexChange", "useNativeScrollingChange", "visibleChange", "widthChange"] }, { kind: "directive", type: i2.DxTemplateDirective, selector: "[dxTemplate]", inputs: ["dxTemplateOf"] }, { kind: "ngmodule", type: DxTooltipModule }, { kind: "component", type: i1.DxTooltipComponent, selector: "dx-tooltip", inputs: ["animation", "closeOnOutsideClick", "container", "contentTemplate", "deferRendering", "disabled", "height", "hideEvent", "hideOnOutsideClick", "hideOnParentScroll", "hint", "hoverStateEnabled", "maxHeight", "maxWidth", "minHeight", "minWidth", "position", "rtlEnabled", "shading", "shadingColor", "showEvent", "target", "visible", "width", "wrapperAttr"], outputs: ["onContentReady", "onDisposing", "onHidden", "onHiding", "onInitialized", "onOptionChanged", "onShowing", "onShown", "animationChange", "closeOnOutsideClickChange", "containerChange", "contentTemplateChange", "deferRenderingChange", "disabledChange", "heightChange", "hideEventChange", "hideOnOutsideClickChange", "hideOnParentScrollChange", "hintChange", "hoverStateEnabledChange", "maxHeightChange", "maxWidthChange", "minHeightChange", "minWidthChange", "positionChange", "rtlEnabledChange", "shadingChange", "shadingColorChange", "showEventChange", "targetChange", "visibleChange", "widthChange", "wrapperAttrChange"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i4.TranslatePipe, name: "translate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CustomChipsButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-custom-chips-button', changeDetection: ChangeDetectionStrategy.OnPush, standalone: true, imports: [
                        // MobileListComponent,
                        DxListModule,
                        DxTooltipModule,
                        CommonModule,
                        TranslateModule,
                    ], template: "<div\r\n  *ngIf=\"!appDateRangeChips\"\r\n  style=\"\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    margin-right: 6px;\r\n    position: relative;\r\n    top: -2px;\r\n  \"\r\n  [ngStyle]=\"{ top: positionTop }\"\r\n  class=\"mobile-position\"\r\n>\r\n  <div\r\n    class=\"chips-btn\"\r\n    tabindex=\"0\"\r\n    (click)=\"swapChipsList()\"\r\n    (keydown.enter)=\"swapChipsList()\"\r\n    (keydown.space)=\"swapChipsList()\"\r\n    [ngClass]=\"{\r\n      'chips-btn-opened': isChipsList(),\r\n      'chips-selected': selectedValue != '' || customDisplayValue\r\n    }\"\r\n  >\r\n    <i style=\"height: 12px\"></i>\r\n    <p class=\"chips-btn-name\">{{ name }}</p>\r\n    <p\r\n      class=\"chips-btn-name\"\r\n      style=\"margin-right: 2px\"\r\n      *ngIf=\"selectedValue != '' || customDisplayValue\"\r\n    >\r\n      :\r\n    </p>\r\n    <p\r\n      class=\"chips-btn-selected\"\r\n      *ngIf=\"selectedValue != '' || customDisplayValue\"\r\n    >\r\n      {{ customDisplayValue || selectedValue }}\r\n    </p>\r\n    <i\r\n      class=\"icon absui-icon--multiplication\"\r\n      *ngIf=\"selectedValue != '' && !disabledClear\"\r\n      (click)=\"clearValue()\"\r\n    ></i>\r\n  </div>\r\n\r\n  <div\r\n    class=\"chips-list\"\r\n    *ngIf=\"isChipsList() && deviceType != 'mobile'\"\r\n    [ngClass]=\"{ 'mobile-chips-list': deviceType !== 'desktop' }\"\r\n  >\r\n    <dx-list\r\n      #listRef\r\n      [dataSource]=\"list\"\r\n      [searchEnabled]=\"false\"\r\n      (onItemClick)=\"onItemClick($event)\"\r\n      [width]=\"width ? width : 210\"\r\n      [height]=\"listHeight ? listHeight : 'auto'\"\r\n    >\r\n      <div\r\n        *dxTemplate=\"let item of 'item'\"\r\n        [ngClass]=\"{ 'selected-chip': item[labelExpr] == selectedValue }\"\r\n      >\r\n        {{ item[labelExpr] }}\r\n      </div>\r\n    </dx-list>\r\n  </div>\r\n</div>\r\n\r\n<!-- <app-mobile-list\r\n  [dataSource]=\"list\"\r\n  [visible]=\"isChipsList()\"\r\n  *ngIf=\"event.deviceType == 'mobile'\"\r\n  (onClosed)=\"isChipsList.set(false)\"\r\n  (onItemClick)=\"onItemClick($event)\"\r\n  [title]=\"name\"\r\n></app-mobile-list> -->\r\n\r\n<div\r\n  *ngIf=\"appDateRangeChips\"\r\n  style=\"\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    margin-right: 6px;\r\n    position: relative;\r\n    top: -2px;\r\n  \"\r\n  [ngStyle]=\"{ top: positionTop }\"\r\n  class=\"mobile-position\"\r\n>\r\n  <div\r\n    class=\"chips-btn\"\r\n    tabindex=\"0\"\r\n    (click)=\"swapChipsList()\"\r\n    (keydown.enter)=\"swapChipsList()\"\r\n    (keydown.space)=\"swapChipsList()\"\r\n    [ngClass]=\"{\r\n      'chips-btn-opened': isChipsList(),\r\n      'chips-selected': selectedValue != '' || customDisplayValue\r\n    }\"\r\n    [id]=\"'dateRangeFilter' + unicalGuid\"\r\n  >\r\n    <i style=\"height: 12px\"></i>\r\n    <p class=\"chips-btn-name\">{{ name }}</p>\r\n    <p\r\n      class=\"chips-btn-name\"\r\n      style=\"margin-right: 2px\"\r\n      *ngIf=\"selectedValue != '' || customDisplayValue\"\r\n    >\r\n      :\r\n    </p>\r\n    <p\r\n      class=\"chips-btn-selected\"\r\n      *ngIf=\"selectedValue != '' || customDisplayValue\"\r\n    >\r\n      {{ customDisplayValue || selectedValue }}\r\n    </p>\r\n    <i\r\n      class=\"icon absui-icon--multiplication\"\r\n      *ngIf=\"selectedValue != '' && !disabledClear\"\r\n      (click)=\"clearValue()\"\r\n    ></i>\r\n  </div>\r\n\r\n  <div\r\n    class=\"chips-list\"\r\n    *ngIf=\"isChipsList() && deviceType != 'mobile'\"\r\n    [ngClass]=\"{ 'mobile-chips-list': deviceType !== 'desktop' }\"\r\n  >\r\n    <dx-list\r\n      #listRef\r\n      [dataSource]=\"list\"\r\n      [searchEnabled]=\"false\"\r\n      (onItemClick)=\"onItemClick($event)\"\r\n      [width]=\"width ? width : 210\"\r\n      [height]=\"listHeight ? listHeight : 'auto'\"\r\n    >\r\n      <div\r\n        *dxTemplate=\"let item of 'item'\"\r\n        [ngClass]=\"{ 'selected-chip': item[labelExpr] == selectedValue }\"\r\n      >\r\n        {{ item[labelExpr] }}\r\n      </div>\r\n    </dx-list>\r\n  </div>\r\n</div>\r\n\r\n<div style=\"display: inline-block\">\r\n  <dx-tooltip\r\n    [target]=\"'#dateRangeFilter' + unicalGuid\"\r\n    hideEvent=\"dxhoverend\"\r\n    [hideOnOutsideClick]=\"true\"\r\n    [showEvent]=\"tooltipShowEvent\"\r\n  >\r\n    <div *dxTemplate=\"let data of 'content'\">\r\n      {{ \"tooltip.dateRangeFilter\" | translate }} (F9)\r\n    </div>\r\n  </dx-tooltip>\r\n</div>\r\n", styles: [":ng-host:focus{border:2px solid red!important}.chips-btn{width:auto;height:26px;background-color:var(--neutral-90, #f5f5f5)!important;border-radius:30px;padding:0 8px;display:inline-block;border:2px solid transparent!important;display:flex;justify-content:center;align-items:center}.chips-btn:hover{background-color:var(--neutral-85, #ededed)!important;border:2px solid transparent!important}.chips-btn:focus{background-color:var(--neutral-90, #f5f5f5)!important;border:2px solid var(--brand-neutral-10, #30393f)!important}.chips-selected{background-color:var(--theme-warning-90, #fef8eb)!important;border:2px solid var(--theme-warning-80, #fef1d7)!important}.chips-selected .chips-btn-name{color:var(--neutral-40, #666666)!important}.chips-selected b,.chips-selected .chips-btn-selected{color:var(--neutral-15, #222222)!important}.chips-selected:hover{border:2px solid var(--theme-warning-80, #fef1d7)!important;background-color:var(--theme-warning-80, #fef1d7)!important}.chips-selected:focus{background-color:var(--theme-warning-90, #fef8eb)!important;border:2px solid var(--brand-neutral-10, #30393f)!important}.clear-panel{border-top:1px solid var(--neutral-80, #e5e5e5);height:36px;margin-left:-5px;width:calc(100% + 10px)}.chips-btn-name{font-family:Roboto;font-style:normal;font-weight:400;font-size:.75rem;line-height:14px;color:var(--text-light-gray, #666666);display:inline-block;cursor:pointer;position:relative;margin:0;white-space:nowrap}.selected-chip{color:var(--brand-10, #bc1a22)!important;font-weight:500!important}.chips-btn-selected{font-family:Roboto;font-style:normal;font-weight:500;font-size:.75rem;line-height:14px;margin-left:2px;color:var(--neutral-10, #000000);display:inline-block;position:relative;margin-bottom:0;margin-top:0;top:0;white-space:nowrap}:host ::ng-deep .absui-icon--multiplication:before{font-size:14px!important;line-height:14px;color:var(--neutral-30, #4c4c4c);position:relative;left:7px;top:0;height:22px;display:inline-flex;width:22px;justify-content:center;align-items:center;border-radius:50%}:host ::ng-deep .absui-icon--multiplication:hover:before{background-color:var(--theme-warning-70, #fdeac4)!important;color:var(--text-brand, #bc1a22)!important}:host ::ng-deep .dx-list-item-content{font-family:Roboto;font-size:.75rem;line-height:10px;padding:10px 15px}.absui-icon--pin-classic:before{font-family:Lumen;content:\"\\e9ea\";display:inline-block;font-size:14px!important;line-height:14px;color:var(--text-light-gray, #666666);margin-right:5px;top:1px;position:relative}.chips-list{background:var(--neutral-100, #ffffff);box-sizing:border-box;border:1px solid var(--neutral-80, #e5e5e5);box-shadow:0 2px 1px #0000000f,0 4px 20px #0000001a;border-radius:8px;padding:5px;min-width:210px;width:auto;position:absolute;z-index:20}.chips-list.mobile-chips-list{position:fixed;margin-top:-10px}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { listRef: [{
                type: ViewChild,
                args: ['listRef']
            }], name: [{
                type: Input
            }], list: [{
                type: Input
            }], width: [{
                type: Input
            }], maxHeight: [{
                type: Input
            }], customDisplayValue: [{
                type: Input
            }], selectedValueInput: [{
                type: Input
            }], disabledClear: [{
                type: Input
            }], positionTop: [{
                type: Input
            }], labelExpr: [{
                type: Input
            }], valueExpr: [{
                type: Input
            }], deleteFilter: [{
                type: Input
            }], appDateRangeChips: [{
                type: Input
            }], onValueChanged: [{
                type: Output
            }], deviceType: [{
                type: Input
            }], clickout: [{
                type: HostListener,
                args: ['document:click']
            }] } });

/*
 * Public API Surface of my-wapro-library
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CustomChipsButtonComponent, MyWaproLibraryComponent, MyWaproLibraryService, WaproDateBoxComponent };
//# sourceMappingURL=my-wapro-library.mjs.map
