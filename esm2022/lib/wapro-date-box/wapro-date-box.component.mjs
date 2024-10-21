import { CommonModule, DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, forwardRef, Output, EventEmitter, ViewChild, } from '@angular/core';
import { DxButtonModule, DxDateBoxModule, DxTooltipModule, } from 'devextreme-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "devextreme-angular";
import * as i3 from "devextreme-angular/ui/nested";
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WaproDateBoxComponent),
    multi: true,
};
const TOOLTIP_DELAY = 600;
export class WaproDateBoxComponent {
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
        this.tooltipShowEvent = { name: 'dxhoverstart', delay: TOOLTIP_DELAY };
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: WaproDateBoxComponent, isStandalone: true, selector: "wapro-date-box", inputs: { displayFormat: "displayFormat", readOnly: "readOnly", type: "type", disabled: "disabled", errorClass: "errorClass", width: "width", noMaxWidth: "noMaxWidth", BLWarning: "BLWarning", BLError: "BLError", opened: "opened" }, outputs: { onValueChanged: "onValueChanged", focusedOut: "focusedOut", focusedIn: "focusedIn" }, providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR], viewQueries: [{ propertyName: "dateBox", first: true, predicate: ["dateBox"], descendants: true }], ngImport: i0, template: "<dx-date-box\r\n  [(value)]=\"myValue\"\r\n  [type]=\"type\"\r\n  [displayFormat]=\"displayFormat\"\r\n  [width]=\"width || 276\"\r\n  class=\"wapro-date-box\"\r\n  [readOnly]=\"readOnly\"\r\n  [disabled]=\"disabled\"\r\n  (mouseover)=\"mouseover()\"\r\n  (mouseout)=\"mouseout()\"\r\n  (onFocusIn)=\"onFocusIn()\"\r\n  (onFocusOut)=\"onFocusOut()\"\r\n  (onValueChanged)=\"onValueChangedDate($event)\"\r\n  (onEnterKey)=\"openBox()\"\r\n  (onOpened)=\"onOpened()\"\r\n  (onClosed)=\"onClosed()\"\r\n  [(opened)]=\"opened\"\r\n  [ngClass]=\"{\r\n    BLError: BLError,\r\n    'input-required': errorClass,\r\n    'date-hover': isHover,\r\n    'no-max-width': noMaxWidth\r\n  }\"\r\n  [id]=\"BLError ? 'dateBoxError' : null\"\r\n  #dateBox\r\n  (onKeyDown)=\"keydown($event)\"\r\n  (onBlur)=\"onBlur($event)\"\r\n  applyValueMode=\"useButtons\"\r\n  valueChangeEvent=\"change blur focusout\"\r\n  [calendarOptions]=\"calendarOptions\"\r\n  [useMaskBehavior]=\"true\"\r\n  [inputAttr]=\"{ 'aria-label': 'Date Time' }\"\r\n>\r\n  <dxi-button\r\n    name=\"calendar\"\r\n    location=\"before\"\r\n    [options]=\"calendarBtn\"\r\n  ></dxi-button>\r\n  <dxi-button\r\n    name=\"minus\"\r\n    location=\"after\"\r\n    cssClass=\"myClass\"\r\n    [options]=\"minusBtn\"\r\n    class=\"wapro-btn-date\"\r\n    *ngIf=\"type != 'time'\"\r\n  ></dxi-button>\r\n  <dxi-button\r\n    name=\"plus\"\r\n    location=\"after\"\r\n    [options]=\"plusBtn\"\r\n    style=\"border-radius: 6px; height: 21px\"\r\n    *ngIf=\"type != 'time'\"\r\n  ></dxi-button>\r\n</dx-date-box>\r\n\r\n<i\r\n  style=\"position: absolute; cursor: pointer; top: -1px; right: 4px\"\r\n  *ngIf=\"BLWarning\"\r\n  class=\"icon absui-icon--warning2 icon-warning-box\"\r\n  [id]=\"'BLWarning'\"\r\n>\r\n</i>\r\n\r\n<i\r\n  style=\"position: absolute; cursor: pointer; top: -1px; right: 4px\"\r\n  *ngIf=\"BLError\"\r\n  class=\"icon absui-icon--error-outline icon-error-box\"\r\n  [id]=\"'BLError'\"\r\n>\r\n</i>\r\n", styles: [".btn-box{width:49px;height:28px;padding-top:1.5px;padding-bottom:1.5px;box-sizing:border-box;border:1px solid var(--neutral-50, #b3b3b3);border-left:none;border-radius:0 6px 6px 0;display:inline-block}.dx-calendar-cell.dx-calendar-contoured-date span{box-shadow:0 0 0 2px var(--brand-10, #bc1a22)}.dx-calendar-cell.dx-state-hover span{background-color:var(--neutral-85,#ededed);color:var(--neutral-10, #000000)}.dx-calendar-cell.dx-calendar-selected-date span{color:var(--neutral-100, #ffffff);background-color:var(--brand-10, #bc1a22)}.dx-calendar-cell.dx-calendar-today span{border:2px solid var(--brand-10,#bc1a22)}.dx-calendar-cell.dx-calendar-selected-date,.dx-calendar-cell.dx-calendar-selected-date.dx-calendar-today{color:var(--neutral-100, #ffffff);box-shadow:inset 0 0 0 1000px transparent!important;font-weight:400}.date-hover{border:1px solid var(--neutral-30,#4c4c4c)!important}.btn-box-hover{width:49px;height:28px;padding-top:1.5px;padding-bottom:1.5px;box-sizing:border-box;border:1px solid var(--neutral-30, #4c4c4c);border-left:none;border-radius:0 6px 6px 0;display:inline-block}.on-focus{box-shadow:0 0 8px #58636a4d;border-radius:4px}.plus-btn{box-sizing:border-box;padding:3px;height:21px;position:relative;width:22px;top:1px;cursor:pointer;float:left;margin-left:2px}.plus-btn:hover{background:var(--neutral-85, #ededed);border-radius:4px}.minus-btn{box-sizing:border-box;padding:3px;height:21px;position:relative;width:22px;top:1px;cursor:pointer;float:left}.minus-btn:hover{background:var(--neutral-85, #ededed);border-radius:4px}.absui-icon--calendar-month-unselect:before{content:\"\\eb0d\";font-size:16px;line-height:16px;color:var(--neutral-30, #4c4c4c);position:absolute;top:5px;left:4px}.absui-icon--add:before{content:\"\\e145\";font-size:16px;line-height:16px;color:var(--neutral-30, #4c4c4c);position:absolute;top:5px;right:5px}.absui-icon--remove:before{content:\"\\e15b\";font-size:16px;line-height:16px;color:var(--neutral-30, #4c4c4c);position:absolute;top:5px;right:26px}.wapro-date-box{display:inline-block;position:relative;padding-left:2px}.wapro-date-box.dx-widget input,.dx-widget textarea{font-family:Roboto;padding-top:8px;padding-left:2px;font-size:.75rem;line-height:16px;color:var(--neutral-30, #4c4c4c)}.wapro-date-box .dx-texteditor-buttons-container>.dx-button.dx-button-has-icon:not(.dx-button-has-text)>.dx-button-content{padding:6px;height:20px;width:18px}.dx-button-mode-text.dx-state-hover,.dx-button-mode-text.dx-state-focused{background-color:var(--neutral-85, #ededed);border-radius:4px}.dx-button-content{margin-left:1px}.no-max-width{max-width:none!important}.disabledBtn{display:none!important}:is() .dx-texteditor-buttons-container>.dx-button{margin:1px 3.5px 1px 1px;border-radius:6px;height:21px}.dx-texteditor.dx-editor-outlined{background:#fff;border:1px solid #ddd;border-radius:4px;height:28px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: DxDateBoxModule }, { kind: "component", type: i2.DxDateBoxComponent, selector: "dx-date-box", inputs: ["acceptCustomValue", "accessKey", "activeStateEnabled", "adaptivityEnabled", "applyButtonText", "applyValueMode", "buttons", "calendarOptions", "cancelButtonText", "dateOutOfRangeMessage", "dateSerializationFormat", "deferRendering", "disabled", "disabledDates", "displayFormat", "dropDownButtonTemplate", "dropDownOptions", "elementAttr", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "interval", "invalidDateMessage", "isDirty", "isValid", "label", "labelMode", "max", "maxLength", "min", "name", "opened", "openOnFieldClick", "pickerType", "placeholder", "readOnly", "rtlEnabled", "showAnalogClock", "showClearButton", "showDropDownButton", "spellcheck", "stylingMode", "tabIndex", "text", "todayButtonText", "type", "useMaskBehavior", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChangeEvent", "visible", "width"], outputs: ["onChange", "onClosed", "onContentReady", "onCopy", "onCut", "onDisposing", "onEnterKey", "onFocusIn", "onFocusOut", "onInitialized", "onInput", "onKeyDown", "onKeyUp", "onOpened", "onOptionChanged", "onPaste", "onValueChanged", "acceptCustomValueChange", "accessKeyChange", "activeStateEnabledChange", "adaptivityEnabledChange", "applyButtonTextChange", "applyValueModeChange", "buttonsChange", "calendarOptionsChange", "cancelButtonTextChange", "dateOutOfRangeMessageChange", "dateSerializationFormatChange", "deferRenderingChange", "disabledChange", "disabledDatesChange", "displayFormatChange", "dropDownButtonTemplateChange", "dropDownOptionsChange", "elementAttrChange", "focusStateEnabledChange", "heightChange", "hintChange", "hoverStateEnabledChange", "inputAttrChange", "intervalChange", "invalidDateMessageChange", "isDirtyChange", "isValidChange", "labelChange", "labelModeChange", "maxChange", "maxLengthChange", "minChange", "nameChange", "openedChange", "openOnFieldClickChange", "pickerTypeChange", "placeholderChange", "readOnlyChange", "rtlEnabledChange", "showAnalogClockChange", "showClearButtonChange", "showDropDownButtonChange", "spellcheckChange", "stylingModeChange", "tabIndexChange", "textChange", "todayButtonTextChange", "typeChange", "useMaskBehaviorChange", "validationErrorChange", "validationErrorsChange", "validationMessageModeChange", "validationMessagePositionChange", "validationStatusChange", "valueChange", "valueChangeEventChange", "visibleChange", "widthChange", "onBlur"] }, { kind: "component", type: i3.DxiButtonComponent, selector: "dxi-button", inputs: ["location", "name", "options", "cssClass", "disabled", "hint", "icon", "onClick", "template", "text", "visible"] }, { kind: "ngmodule", type: DxTooltipModule }, { kind: "ngmodule", type: TranslateModule }, { kind: "ngmodule", type: DxButtonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Fwcm8tZGF0ZS1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXktd2Fwcm8tbGlicmFyeS9zcmMvbGliL3dhcHJvLWRhdGUtYm94L3dhcHJvLWRhdGUtYm94LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL215LXdhcHJvLWxpYnJhcnkvc3JjL2xpYi93YXByby1kYXRlLWJveC93YXByby1kYXRlLWJveC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLGNBQWMsRUFFZCxlQUFlLEVBQ2YsZUFBZSxHQUNoQixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBSXpFLE1BQU0sQ0FBQyxNQUFNLG1DQUFtQyxHQUFRO0lBQ3RELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUM7QUE4QjFCLE1BQU0sT0FBTyxxQkFBcUI7SUFpRGhDLElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQVcsT0FBTyxDQUFDLENBQXlCO1FBQzFDLElBQUksQ0FB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d0JBQ2YsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGNBQWM7cUJBQ2Y7c0ZBR1MsY0FBYztzQkFBdkIsTUFBTTtnQkFDZSxPQUFPO3NCQUE1QixTQUFTO3VCQUFDLFNBQVM7Z0JBRVYsVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxTQUFTO3NCQUFsQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgRHhCdXR0b25Nb2R1bGUsXHJcbiAgRHhEYXRlQm94Q29tcG9uZW50LFxyXG4gIER4RGF0ZUJveE1vZHVsZSxcclxuICBEeFRvb2x0aXBNb2R1bGUsXHJcbn0gZnJvbSAnZGV2ZXh0cmVtZS1hbmd1bGFyJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsdWVDaGFuZ2VkRXZlbnQgfSBmcm9tICdkZXZleHRyZW1lL3Zpei9yYW5nZV9zZWxlY3Rvcic7XHJcbmltcG9ydCB7IEtleURvd25FdmVudCB9IGZyb20gJ2RldmV4dHJlbWUvdWkvZGF0YV9ncmlkJztcclxuXHJcbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFdhcHJvRGF0ZUJveENvbXBvbmVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG5jb25zdCBUT09MVElQX0RFTEFZID0gNjAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd3YXByby1kYXRlLWJveCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3dhcHJvLWRhdGUtYm94LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybDogJy4vd2Fwcm8tZGF0ZS1ib3guY29tcG9uZW50LmNzcycsXHJcbiAgaW5wdXRzOiBbXHJcbiAgICAnZGlzcGxheUZvcm1hdCcsXHJcbiAgICAncmVhZE9ubHknLFxyXG4gICAgJ3R5cGUnLFxyXG4gICAgJ2Rpc2FibGVkJyxcclxuICAgICdlcnJvckNsYXNzJyxcclxuICAgICd3aWR0aCcsXHJcbiAgICAnbm9NYXhXaWR0aCcsXHJcbiAgICAnQkxXYXJuaW5nJyxcclxuICAgICdCTEVycm9yJyxcclxuICAgICdvcGVuZWQnLFxyXG4gIF0sXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHByb3ZpZGVyczogW0NVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBEeERhdGVCb3hNb2R1bGUsXHJcbiAgICBEeFRvb2x0aXBNb2R1bGUsXHJcbiAgICBUcmFuc2xhdGVNb2R1bGUsXHJcbiAgICBEeEJ1dHRvbk1vZHVsZSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgV2Fwcm9EYXRlQm94Q29tcG9uZW50IHtcclxuICBAT3V0cHV0KCkgb25WYWx1ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQFZpZXdDaGlsZCgnZGF0ZUJveCcpIGRhdGVCb3g6IER4RGF0ZUJveENvbXBvbmVudCB8IGFueTtcclxuXHJcbiAgQE91dHB1dCgpIGZvY3VzZWRPdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGZvY3VzZWRJbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgbm9NYXhXaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHdpZHRoOiBudW1iZXIgfCBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIF92YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSA9ICcnO1xyXG4gIGRpc3BsYXlGb3JtYXQ6IHN0cmluZyA9ICcnO1xyXG4gIHJlYWRPbmx5ID0gZmFsc2U7XHJcbiAgdHlwZTogJ2RhdGUnIHwgJ2RhdGV0aW1lJyB8ICd0aW1lJyA9ICdkYXRlJztcclxuICBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIGVycm9yQ2xhc3MgPSBmYWxzZTtcclxuICBCTEVycm9yID0gZmFsc2U7XHJcbiAgQkxXYXJuaW5nID0gZmFsc2U7XHJcblxyXG4gIGlzSG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBpc0ZvY3VzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcGx1c0J0biA9IHtcclxuICAgIGljb246ICdpY29uIGFic3VpLWljb24tLWFkZCcsXHJcbiAgICBzdHlsaW5nTW9kZTogJ3RleHQnLFxyXG4gICAgb25DbGljazogKCkgPT4ge1xyXG4gICAgICB0aGlzLmFkZERheSgpO1xyXG4gICAgfSxcclxuICB9O1xyXG4gIG1pbnVzQnRuID0ge1xyXG4gICAgaWNvbjogJ2ljb24gYWJzdWktaWNvbi0tcmVtb3ZlJyxcclxuICAgIHN0eWxpbmdNb2RlOiAndGV4dCcsXHJcbiAgICBvbkNsaWNrOiAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3VidHJhY3REYXkoKTtcclxuICAgIH0sXHJcbiAgfTtcclxuICBvcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBub3RPcGVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY2FsZW5kYXJCdG4gPSB7XHJcbiAgICBpY29uOiAnaWNvbiBhYnN1aS1pY29uLS1jYWxlbmRhci1tb250aC11bnNlbGVjdCcsXHJcbiAgICBlbGVtZW50QXR0cjogeyAnZGF0YS1jeSc6ICdjYWxlbmRhci1idG4tb3BlbicgfSxcclxuICAgIHN0eWxpbmdNb2RlOiAndGV4dCcsXHJcbiAgICB0YWJJbmRleDogLTEsXHJcbiAgICBvbkNsaWNrOiAoKSA9PiB7XHJcbiAgICAgIHRoaXMub3BlbmVkID0gIXRoaXMub3BlbmVkO1xyXG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH0sXHJcbiAgfTtcclxuICBjYWxlbmRhck9wdGlvbnM6IGFueTtcclxuICBjaGFuZ2VCeVVzZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIGdldCBteVZhbHVlKCk6IHN0cmluZyB8IG51bWJlciB8IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0IG15VmFsdWUodjogc3RyaW5nIHwgbnVtYmVyIHwgRGF0ZSkge1xyXG4gICAgaWYgKHYgIT09IHRoaXMuX3ZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlID0gdjtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHYpO1xyXG4gICAgICB9IGNhdGNoIHt9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b29sdGlwU2hvd0V2ZW50ID0geyBuYW1lOiAnZHhob3ZlcnN0YXJ0JywgZGVsYXk6IFRPT0xUSVBfREVMQVkgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgaWYgKCF0aGlzLmRpc3BsYXlGb3JtYXQpIHRoaXMuZGlzcGxheUZvcm1hdCA9ICd5eXl5LU1NLWRkJztcclxuICAgIGlmICghdGhpcy50eXBlKSB0aGlzLnR5cGUgPSAnZGF0ZSc7XHJcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmNhbGVuZGFyT3B0aW9ucyA9IHtcclxuICAgICAgb25Db250ZW50UmVhZHk6IChlOiBhbnkpID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGUuY29tcG9uZW50Lm9wdGlvbignaW5wdXRBdHRyJywgeyByZWFkb25seTogdHJ1ZSB9KTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIGxldCB0b2RheUJ0biA9XHJcbiAgICAgICAgICB0aGlzLmRhdGVCb3guZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXHJcbiAgICAgICAgICAgICdkeC1idXR0b24tdG9kYXknXHJcbiAgICAgICAgICApWzBdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gJ2RhdGV0aW1lJykge1xyXG4gICAgICAgICAgbGV0IGJ1dHRvbkRvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxyXG4gICAgICAgICAgICAnZHgtd2lkZ2V0IGR4LWJ1dHRvbiBkeC1idXR0b24tbW9kZS1jb250YWluZWQgZHgtYnV0dG9uLW5vcm1hbCBkeC1idXR0b24taGFzLXRleHQgZHgtcG9wdXAtZG9uZSdcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBsZXQgYnV0dG9uQ2FuY2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcclxuICAgICAgICAgICAgJ2R4LXdpZGdldCBkeC1idXR0b24gZHgtYnV0dG9uLW1vZGUtY29udGFpbmVkIGR4LWJ1dHRvbi1ub3JtYWwgZHgtYnV0dG9uLWhhcy10ZXh0IGR4LXBvcHVwLWNhbmNlbCdcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidXR0b25Eb25lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbkRvbmVbaV0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWRCdG4nKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1dHRvbkNhbmNlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBidXR0b25DYW5jZWxbaV0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWRCdG4nKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBlLmVsZW1lbnQub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5ld0RhdGUgPSBuZXcgRGF0ZVBpcGUoJ2VuLVVTJykudHJhbnNmb3JtKFxyXG4gICAgICAgICAgICAgIGUuY29tcG9uZW50Lm9wdGlvbigndmFsdWUnKSxcclxuICAgICAgICAgICAgICAneXl5eS1NTS1kZFRISDptbTpzcydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VCeVVzZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm15VmFsdWUgPSBuZXdEYXRlIGFzIHN0cmluZztcclxuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9kYXlCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgIGxldCBuZXdEYXRlID0gbmV3IERhdGVQaXBlKCdlbi1VUycpLnRyYW5zZm9ybShcclxuICAgICAgICAgICAgbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgJ3l5eXktTU0tZGRUSEg6bW06c3MnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VCeVVzZXIgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5teVZhbHVlID0gbmV3RGF0ZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBhZGREYXkgPSAoKSA9PiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubXlWYWx1ZSA9PSBudWxsIHx8XHJcbiAgICAgIHRoaXMubXlWYWx1ZSA9PSB1bmRlZmluZWQgfHxcclxuICAgICAgdGhpcy5teVZhbHVlID09ICcnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5teVZhbHVlID0gbmV3IERhdGVQaXBlKCdlbi1VUycpLnRyYW5zZm9ybShcclxuICAgICAgICBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICd5eXl5LU1NLWRkVEhIOm1tOnNzJ1xyXG4gICAgICApIGFzIHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbmV3RGF0ZSA9IG5ldyBEYXRlUGlwZSgnZW4tVVMnKS50cmFuc2Zvcm0oXHJcbiAgICAgIG5ldyBEYXRlKHRoaXMubXlWYWx1ZSkuZ2V0VGltZSgpICsgMSAqIDEwMDAgKiA2MCAqIDYwICogMjQsXHJcbiAgICAgICd5eXl5LU1NLWRkVEhIOm1tOnNzJ1xyXG4gICAgKTtcclxuICAgIHRoaXMuY2hhbmdlQnlVc2VyID0gdHJ1ZTtcclxuICAgIHRoaXMubXlWYWx1ZSA9IG5ld0RhdGUgYXMgc3RyaW5nO1xyXG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfTtcclxuXHJcbiAgb3BlbkJveCA9ICgpID0+IHtcclxuICAgIGlmICghdGhpcy5ub3RPcGVuKSB7XHJcbiAgICAgIHRoaXMub3BlbmVkID0gIXRoaXMub3BlbmVkO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG9uT3BlbmVkID0gKCkgPT4ge1xyXG4gICAgdGhpcy5ub3RPcGVuID0gdHJ1ZTtcclxuICB9O1xyXG5cclxuICBvbkNsb3NlZCA9ICgpID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLm5vdE9wZW4gPSBmYWxzZTtcclxuICAgIH0sIDUwMCk7XHJcbiAgfTtcclxuXHJcbiAgb25WYWx1ZUNoYW5nZWREYXRlID0gKGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKHRoaXMudHlwZSAhPSAnZGF0ZXRpbWUnICYmICF0aGlzLmFyZURhdGVzRXF1YWwoZSkpIHtcclxuICAgICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBldmVudCA9IHsgLi4uZSB9O1xyXG4gICAgaWYgKCFldmVudC5ldmVudCkge1xyXG4gICAgICBldmVudC5ldmVudCA9IHt9IGFzIGFueTtcclxuICAgIH1cclxuICAgIHRoaXMub25WYWx1ZUNoYW5nZWQuZW1pdChldmVudCk7XHJcbiAgICB0aGlzLmNoYW5nZUJ5VXNlciA9IGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIGFyZURhdGVzRXF1YWwoZTogYW55KSB7XHJcbiAgICBpZiAoIWUudmFsdWUgfHwgKGUudmFsdWUgJiYgIWUucHJldmlvdXNWYWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gbmV3IERhdGVQaXBlKCdlbi1VUycpLnRyYW5zZm9ybShcclxuICAgICAgICBuZXcgRGF0ZShlLnZhbHVlKSxcclxuICAgICAgICB0aGlzLmRpc3BsYXlGb3JtYXRcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcHJldmlvdXNGb3JtYXR0ZWRWYWx1ZSA9IG5ldyBEYXRlUGlwZSgnZW4tVVMnKS50cmFuc2Zvcm0oXHJcbiAgICAgICAgbmV3IERhdGUoZS5wcmV2aW91c1ZhbHVlKSxcclxuICAgICAgICB0aGlzLmRpc3BsYXlGb3JtYXRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiBjdXJyZW50VmFsdWUgPT09IHByZXZpb3VzRm9ybWF0dGVkVmFsdWU7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25CbHVyID0gKGU6IGFueSkgPT4ge1xyXG4gICAgZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R4LXN0YXRlLWZvY3VzZWQnKTtcclxuICB9O1xyXG5cclxuICBzdWJ0cmFjdERheSA9ICgpID0+IHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5teVZhbHVlID09IG51bGwgfHxcclxuICAgICAgdGhpcy5teVZhbHVlID09IHVuZGVmaW5lZCB8fFxyXG4gICAgICB0aGlzLm15VmFsdWUgPT0gJydcclxuICAgICkge1xyXG4gICAgICB0aGlzLm15VmFsdWUgPSBuZXcgRGF0ZVBpcGUoJ2VuLVVTJykudHJhbnNmb3JtKFxyXG4gICAgICAgIG5ldyBEYXRlKCksXHJcbiAgICAgICAgJ3l5eXktTU0tZGRUSEg6bW06c3MnXHJcbiAgICAgICkgYXMgc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBuZXdEYXRlID0gbmV3IERhdGVQaXBlKCdlbi1VUycpLnRyYW5zZm9ybShcclxuICAgICAgbmV3IERhdGUodGhpcy5teVZhbHVlKS5nZXRUaW1lKCkgLSAxICogMTAwMCAqIDYwICogNjAgKiAyNCxcclxuICAgICAgJ3l5eXktTU0tZGRUSEg6bW06c3MnXHJcbiAgICApO1xyXG4gICAgdGhpcy5jaGFuZ2VCeVVzZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5teVZhbHVlID0gbmV3RGF0ZSBhcyBzdHJpbmc7XHJcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICB9O1xyXG5cclxuICBrZXlkb3duID0gKGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKCF0aGlzLnJlYWRPbmx5KSB7XHJcbiAgICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQgPSAoZS5ldmVudCBhcyBhbnkpLm9yaWdpbmFsRXZlbnQ7XHJcbiAgICAgIGlmIChvcmlnaW5hbEV2ZW50LmNvZGUgPT0gJ0Fycm93RG93bicgJiYgb3JpZ2luYWxFdmVudC5zaGlmdEtleSlcclxuICAgICAgICB0aGlzLnN1YnRyYWN0RGF5KCk7XHJcbiAgICAgIGlmIChvcmlnaW5hbEV2ZW50LmNvZGUgPT0gJ0Fycm93VXAnICYmIG9yaWdpbmFsRXZlbnQuc2hpZnRLZXkpXHJcbiAgICAgICAgdGhpcy5hZGREYXkoKTtcclxuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgbW91c2VvdmVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5pc0hvdmVyID0gdHJ1ZTtcclxuICB9O1xyXG5cclxuICBtb3VzZW91dCA9ICgpID0+IHtcclxuICAgIHRoaXMuaXNIb3ZlciA9IGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIG9uRm9jdXNJbiA9ICgpID0+IHtcclxuICAgIHRoaXMuaXNGb2N1cyA9IHRydWU7XHJcbiAgICB0aGlzLmZvY3VzZWRJbi5lbWl0KHRydWUpO1xyXG4gIH07XHJcblxyXG4gIG9uRm9jdXNPdXQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmlzRm9jdXMgPSBmYWxzZTtcclxuICAgIHRoaXMuZm9jdXNlZE91dC5lbWl0KHRydWUpO1xyXG4gIH07XHJcblxyXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XHJcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5teVZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuICBzZXREaXNhYmxlZFN0YXRlPyhfaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgLy90aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgfVxyXG59XHJcbiIsIjxkeC1kYXRlLWJveFxyXG4gIFsodmFsdWUpXT1cIm15VmFsdWVcIlxyXG4gIFt0eXBlXT1cInR5cGVcIlxyXG4gIFtkaXNwbGF5Rm9ybWF0XT1cImRpc3BsYXlGb3JtYXRcIlxyXG4gIFt3aWR0aF09XCJ3aWR0aCB8fCAyNzZcIlxyXG4gIGNsYXNzPVwid2Fwcm8tZGF0ZS1ib3hcIlxyXG4gIFtyZWFkT25seV09XCJyZWFkT25seVwiXHJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAobW91c2VvdmVyKT1cIm1vdXNlb3ZlcigpXCJcclxuICAobW91c2VvdXQpPVwibW91c2VvdXQoKVwiXHJcbiAgKG9uRm9jdXNJbik9XCJvbkZvY3VzSW4oKVwiXHJcbiAgKG9uRm9jdXNPdXQpPVwib25Gb2N1c091dCgpXCJcclxuICAob25WYWx1ZUNoYW5nZWQpPVwib25WYWx1ZUNoYW5nZWREYXRlKCRldmVudClcIlxyXG4gIChvbkVudGVyS2V5KT1cIm9wZW5Cb3goKVwiXHJcbiAgKG9uT3BlbmVkKT1cIm9uT3BlbmVkKClcIlxyXG4gIChvbkNsb3NlZCk9XCJvbkNsb3NlZCgpXCJcclxuICBbKG9wZW5lZCldPVwib3BlbmVkXCJcclxuICBbbmdDbGFzc109XCJ7XHJcbiAgICBCTEVycm9yOiBCTEVycm9yLFxyXG4gICAgJ2lucHV0LXJlcXVpcmVkJzogZXJyb3JDbGFzcyxcclxuICAgICdkYXRlLWhvdmVyJzogaXNIb3ZlcixcclxuICAgICduby1tYXgtd2lkdGgnOiBub01heFdpZHRoXHJcbiAgfVwiXHJcbiAgW2lkXT1cIkJMRXJyb3IgPyAnZGF0ZUJveEVycm9yJyA6IG51bGxcIlxyXG4gICNkYXRlQm94XHJcbiAgKG9uS2V5RG93bik9XCJrZXlkb3duKCRldmVudClcIlxyXG4gIChvbkJsdXIpPVwib25CbHVyKCRldmVudClcIlxyXG4gIGFwcGx5VmFsdWVNb2RlPVwidXNlQnV0dG9uc1wiXHJcbiAgdmFsdWVDaGFuZ2VFdmVudD1cImNoYW5nZSBibHVyIGZvY3Vzb3V0XCJcclxuICBbY2FsZW5kYXJPcHRpb25zXT1cImNhbGVuZGFyT3B0aW9uc1wiXHJcbiAgW3VzZU1hc2tCZWhhdmlvcl09XCJ0cnVlXCJcclxuICBbaW5wdXRBdHRyXT1cInsgJ2FyaWEtbGFiZWwnOiAnRGF0ZSBUaW1lJyB9XCJcclxuPlxyXG4gIDxkeGktYnV0dG9uXHJcbiAgICBuYW1lPVwiY2FsZW5kYXJcIlxyXG4gICAgbG9jYXRpb249XCJiZWZvcmVcIlxyXG4gICAgW29wdGlvbnNdPVwiY2FsZW5kYXJCdG5cIlxyXG4gID48L2R4aS1idXR0b24+XHJcbiAgPGR4aS1idXR0b25cclxuICAgIG5hbWU9XCJtaW51c1wiXHJcbiAgICBsb2NhdGlvbj1cImFmdGVyXCJcclxuICAgIGNzc0NsYXNzPVwibXlDbGFzc1wiXHJcbiAgICBbb3B0aW9uc109XCJtaW51c0J0blwiXHJcbiAgICBjbGFzcz1cIndhcHJvLWJ0bi1kYXRlXCJcclxuICAgICpuZ0lmPVwidHlwZSAhPSAndGltZSdcIlxyXG4gID48L2R4aS1idXR0b24+XHJcbiAgPGR4aS1idXR0b25cclxuICAgIG5hbWU9XCJwbHVzXCJcclxuICAgIGxvY2F0aW9uPVwiYWZ0ZXJcIlxyXG4gICAgW29wdGlvbnNdPVwicGx1c0J0blwiXHJcbiAgICBzdHlsZT1cImJvcmRlci1yYWRpdXM6IDZweDsgaGVpZ2h0OiAyMXB4XCJcclxuICAgICpuZ0lmPVwidHlwZSAhPSAndGltZSdcIlxyXG4gID48L2R4aS1idXR0b24+XHJcbjwvZHgtZGF0ZS1ib3g+XHJcblxyXG48aVxyXG4gIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBjdXJzb3I6IHBvaW50ZXI7IHRvcDogLTFweDsgcmlnaHQ6IDRweFwiXHJcbiAgKm5nSWY9XCJCTFdhcm5pbmdcIlxyXG4gIGNsYXNzPVwiaWNvbiBhYnN1aS1pY29uLS13YXJuaW5nMiBpY29uLXdhcm5pbmctYm94XCJcclxuICBbaWRdPVwiJ0JMV2FybmluZydcIlxyXG4+XHJcbjwvaT5cclxuXHJcbjxpXHJcbiAgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IGN1cnNvcjogcG9pbnRlcjsgdG9wOiAtMXB4OyByaWdodDogNHB4XCJcclxuICAqbmdJZj1cIkJMRXJyb3JcIlxyXG4gIGNsYXNzPVwiaWNvbiBhYnN1aS1pY29uLS1lcnJvci1vdXRsaW5lIGljb24tZXJyb3ItYm94XCJcclxuICBbaWRdPVwiJ0JMRXJyb3InXCJcclxuPlxyXG48L2k+XHJcbiJdfQ==