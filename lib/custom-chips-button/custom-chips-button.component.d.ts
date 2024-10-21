import { ElementRef, EventEmitter, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import { ItemClickEvent } from 'devextreme/ui/list';
import * as i0 from "@angular/core";
export declare class CustomChipsButtonComponent implements OnInit {
    private eRef;
    cd: ChangeDetectorRef;
    listRef: DxListComponent | any;
    name: string | null;
    list: {
        value: any;
        label: string;
    }[] | any[];
    width: number | string | null;
    maxHeight: number | string | null;
    customDisplayValue: string | null;
    selectedValueInput: any;
    disabledClear: boolean;
    positionTop: string;
    labelExpr: string;
    valueExpr: string;
    deleteFilter: boolean;
    appDateRangeChips: boolean;
    onValueChanged: EventEmitter<any>;
    deviceType: 'desktop' | 'mobile';
    unicalGuid: number;
    isChipsList: import("@angular/core").WritableSignal<boolean>;
    selectedValue: string;
    listHeight: number | string | null;
    tooltipShowEvent: {
        name: string;
        delay: number;
    };
    clickout(): void;
    constructor(eRef: ElementRef, cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    checkSelectedValue(): void;
    clearValue: () => void;
    onItemClick: (e: ItemClickEvent) => void;
    swapChipsList(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomChipsButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomChipsButtonComponent, "app-custom-chips-button", never, { "name": { "alias": "name"; "required": false; }; "list": { "alias": "list"; "required": false; }; "width": { "alias": "width"; "required": false; }; "maxHeight": { "alias": "maxHeight"; "required": false; }; "customDisplayValue": { "alias": "customDisplayValue"; "required": false; }; "selectedValueInput": { "alias": "selectedValueInput"; "required": false; }; "disabledClear": { "alias": "disabledClear"; "required": false; }; "positionTop": { "alias": "positionTop"; "required": false; }; "labelExpr": { "alias": "labelExpr"; "required": false; }; "valueExpr": { "alias": "valueExpr"; "required": false; }; "deleteFilter": { "alias": "deleteFilter"; "required": false; }; "appDateRangeChips": { "alias": "appDateRangeChips"; "required": false; }; "deviceType": { "alias": "deviceType"; "required": false; }; }, { "onValueChanged": "onValueChanged"; }, never, never, true, never>;
}
