import { EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableColumn, TableSettings } from '../models/primeng-table.model';
import * as i0 from "@angular/core";
export declare class PrimeNgTable implements OnInit {
    private datePipe;
    onRowClick: EventEmitter<any>;
    loadDataService: (params: any) => Observable<any>;
    data: any[];
    columns: TableColumn[];
    tableSettings: TableSettings;
    dropdowns: Record<string, any[]>;
    determineButtonValue: (button: import("../models/primeng-table.model").TableButton, property: string, rowData: any) => any;
    buildCheckboxFilterOptions: (filterOptions: string[]) => import("../models/primeng-table.model").ColumnCheckboxFilterOptions[];
    lastEventLoaded: any;
    totalRecords: number;
    DEFAULT_ROWS_PER_PAGE: number;
    DEFAULT_ROWS_PER_PAGE_OPTIONS: number[];
    constructor(datePipe: DatePipe);
    ngOnInit(): void;
    loadData(event: any): void;
    reloadData(): void;
    updateEntity<T extends {
        id?: number;
    }>(updatedData: T): void;
    updateTableData(updatedData: any): void;
    getFormattedText(col: any, rowData: any): any;
    onDateSelect(value: Date, filterCallback: Function): void;
    handleButtonClick(event: MouseEvent, button: any, rowData: any, rowIndex: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeNgTable, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrimeNgTable, "primeng-table", never, { "loadDataService": { "alias": "loadDataService"; "required": false; }; "data": { "alias": "data"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "tableSettings": { "alias": "tableSettings"; "required": false; }; "dropdowns": { "alias": "dropdowns"; "required": false; }; }, { "onRowClick": "onRowClick"; }, never, never, false, never>;
}
