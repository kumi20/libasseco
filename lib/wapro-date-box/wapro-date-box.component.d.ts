import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DxDateBoxComponent } from 'devextreme-angular';
import * as i0 from "@angular/core";
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class WaproDateBoxComponent {
    cd: ChangeDetectorRef;
    onValueChanged: EventEmitter<any>;
    dateBox: DxDateBoxComponent | any;
    focusedOut: EventEmitter<any>;
    focusedIn: EventEmitter<any>;
    noMaxWidth: boolean;
    width: number | string | null;
    private _value;
    displayFormat: string;
    readOnly: boolean;
    type: 'date' | 'datetime' | 'time';
    disabled: boolean;
    errorClass: boolean;
    BLError: boolean;
    BLWarning: boolean;
    isHover: boolean;
    isFocus: boolean;
    plusBtn: {
        icon: string;
        stylingMode: string;
        onClick: () => void;
    };
    minusBtn: {
        icon: string;
        stylingMode: string;
        onClick: () => void;
    };
    opened: boolean;
    notOpen: boolean;
    calendarBtn: {
        icon: string;
        elementAttr: {
            'data-cy': string;
        };
        stylingMode: string;
        tabIndex: number;
        onClick: () => void;
    };
    calendarOptions: any;
    changeByUser: boolean;
    get myValue(): string | number | Date;
    set myValue(v: string | number | Date);
    tooltipShowEvent: {
        name: string;
        delay: number;
    };
    constructor(cd: ChangeDetectorRef);
    addDay: () => void;
    openBox: () => void;
    onOpened: () => void;
    onClosed: () => void;
    onValueChangedDate: (e: any) => void;
    areDatesEqual(e: any): boolean;
    onBlur: (e: any) => void;
    subtractDay: () => void;
    keydown: (e: any) => void;
    mouseover: () => void;
    mouseout: () => void;
    onFocusIn: () => void;
    onFocusOut: () => void;
    onChange: (_: any) => void;
    onTouched: () => void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(_isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaproDateBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaproDateBoxComponent, "wapro-date-box", never, { "displayFormat": { "alias": "displayFormat"; "required": false; }; "readOnly": { "alias": "readOnly"; "required": false; }; "type": { "alias": "type"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "errorClass": { "alias": "errorClass"; "required": false; }; "width": { "alias": "width"; "required": false; }; "noMaxWidth": { "alias": "noMaxWidth"; "required": false; }; "BLWarning": { "alias": "BLWarning"; "required": false; }; "BLError": { "alias": "BLError"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "onValueChanged": "onValueChanged"; "focusedOut": "focusedOut"; "focusedIn": "focusedIn"; }, never, never, true, never>;
}
