import * as i0 from '@angular/core';
import { EventEmitter, Component, Output, Input, Injectable, Inject, Pipe, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { formatDate, DatePipe } from '@angular/common';
import * as i2 from 'primeng/table';
import { TableModule } from 'primeng/table';
import * as i3 from 'primeng/api';
import * as i4 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import * as i5 from 'primeng/calendar';
import { CalendarModule } from 'primeng/calendar';
import * as i6 from 'primeng/multiselect';
import { MultiSelectModule } from 'primeng/multiselect';
import * as i7 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 20, 30, 40];
const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_TABLE_SETTINGS = {
    showPaginator: true,
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    rowsPerPageOptions: DEFAULT_ROWS_PER_PAGE_OPTIONS,
    totalRecords: 0,
    isRowClickable: false,
    cssClass: '',
};
const ENABLE_FILTER_SORT = {
    filterable: true,
    sortable: true,
};

const transformSortForRequest = (criteria) => criteria.map((item) => {
    const direction = item.order === 1 ? 'asc' : 'desc';
    return `${item.field}:${direction}`;
});
const transformFiltersForRequest = (filters) => {
    const transformedArray = [];
    for (const key in filters) {
        const filterValue = filters[key];
        if (!filterValue) {
            continue;
        }
        (Array.isArray(filterValue) ? filterValue : [filterValue]).forEach((filter) => {
            const shorthandMatchMode = getShorthandMatchMode(filter.matchMode);
            if (filter.value) {
                if (Array.isArray(filter.value)) {
                    // when multiple values are selected, we need to use 'in' operator
                    const value = filter.value.join(';');
                    transformedArray.push(`${key}:in:${value}`);
                }
                else {
                    transformedArray.push(`${key}:${shorthandMatchMode}:${filter.value}`);
                }
            }
        });
    }
    return transformedArray;
};
const getShorthandMatchMode = (matchMode) => {
    switch (matchMode) {
        case 'startsWith':
            return 'sw';
        case 'dateIs':
        case 'contains':
            return 'like';
        case 'notContains':
            return 'neq';
        case 'endsWith':
            return 'ew';
        case 'equals':
            return 'eq';
        case 'notEquals':
            return 'neq';
        default:
            return matchMode;
    }
};
const buildCheckboxFilterOptions = (filterOptions) => filterOptions.map((filterOption) => ({
    label: filterOption,
    value: filterOption,
}));
const deepCloneObject = (objectToClone) => {
    if (objectToClone === null || typeof objectToClone !== 'object') {
        return objectToClone;
    }
    if (Array.isArray(objectToClone)) {
        return objectToClone.map(deepCloneObject);
    }
    if (objectToClone instanceof Object) {
        const clonedObject = {};
        for (const key in objectToClone) {
            if (Object.hasOwnProperty.call(objectToClone, key)) {
                clonedObject[key] = deepCloneObject(objectToClone[key]);
            }
        }
        return clonedObject;
    }
};
const determineButtonValue = (button, property, rowData) => {
    const propValue = button[property];
    if (propValue && typeof propValue === 'function') {
        return propValue(rowData);
    }
    return propValue ?? '';
};

class PrimeNgTable {
    constructor(datePipe) {
        this.datePipe = datePipe;
        this.onRowClick = new EventEmitter();
        this.data = [];
        this.columns = [];
        this.tableSettings = DEFAULT_TABLE_SETTINGS;
        this.determineButtonValue = determineButtonValue;
        this.buildCheckboxFilterOptions = buildCheckboxFilterOptions;
        this.DEFAULT_ROWS_PER_PAGE = DEFAULT_ROWS_PER_PAGE;
        this.DEFAULT_ROWS_PER_PAGE_OPTIONS = DEFAULT_ROWS_PER_PAGE_OPTIONS;
    }
    ngOnInit() {
        this.lastEventLoaded = {};
        this.columns.forEach((col) => {
            if (col.checkboxFilterOptions) {
                col.checkboxFilterOptions = this.buildCheckboxFilterOptions(col.checkboxFilterOptions);
            }
        });
    }
    loadData(event) {
        if (!this.loadDataService) {
            return;
        }
        this.lastEventLoaded = deepCloneObject(event);
        const currentPage = event.first / event.rows + 1;
        let params = {
            filter: transformFiltersForRequest(event.filters),
            sort: event.multiSortMeta && transformSortForRequest(event.multiSortMeta),
            pageable: {
                // Pages count start from 0 on BE, so we are decreasing the page with 1
                page: currentPage - 1,
                size: event.rows,
            },
        };
        this.loadDataService(params).subscribe({
            next: (res) => {
                if (!res) {
                    this.totalRecords = 0;
                    return;
                }
                const { page, content } = res.data;
                if (!content) {
                    this.data = [];
                }
                else {
                    this.data = content;
                }
                this.totalRecords = page?.totalElements;
                this.tableSettings.totalRecords = this.totalRecords;
            },
            error: (err) => {
                throw Error(err);
            },
        });
    }
    reloadData() {
        this.loadData(this.lastEventLoaded);
    }
    updateEntity(updatedData) {
        const index = this.data.findIndex((row) => row.id === updatedData.id);
        if (index !== -1) {
            const updatedEntity = { ...this.data[index], ...updatedData };
            this.data[index] = updatedEntity;
        }
    }
    updateTableData(updatedData) {
        if (!updatedData) {
            return;
        }
        this.data = [...updatedData];
    }
    getFormattedText(col, rowData) {
        if (!rowData[col.field]) {
            return;
        }
        if (col.type === 'date') {
            return this.datePipe.transform(rowData[col.field], 'y-MM-d');
        }
        if (typeof rowData[col.field] === 'object') {
            return rowData[col.field].value;
        }
        return rowData[col.field];
    }
    onDateSelect(value, filterCallback) {
        if (value) {
            const timezoneOffset = value.getTimezoneOffset() * 60000;
            const adjustedDate = new Date(value.getTime() - timezoneOffset);
            const isoFormattedDate = adjustedDate.toISOString().slice(0, -1).split('T')[0];
            filterCallback(isoFormattedDate);
        }
    }
    handleButtonClick(event, button, rowData, rowIndex) {
        event.stopPropagation();
        button.action(rowData, rowIndex);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTable, deps: [{ token: i1.DatePipe }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: PrimeNgTable, selector: "primeng-table", inputs: { loadDataService: "loadDataService", data: "data", columns: "columns", tableSettings: "tableSettings", dropdowns: "dropdowns" }, outputs: { onRowClick: "onRowClick" }, ngImport: i0, template: "<p-table\n  #dataTable\n  [columns]=\"columns\"\n  [value]=\"data\"\n  [paginator]=\"!!tableSettings.showPaginator\"\n  [rows]=\"tableSettings.rowsPerPage || DEFAULT_ROWS_PER_PAGE\"\n  [showCurrentPageReport]=\"true\"\n  [currentPageReportTemplate]=\"'Showing {first} to {last} of {totalRecords} entries'\"\n  [rowsPerPageOptions]=\"tableSettings.rowsPerPageOptions || DEFAULT_ROWS_PER_PAGE_OPTIONS\"\n  [totalRecords]=\"tableSettings.totalRecords\"\n  [lazy]=\"true\"\n  (onLazyLoad)=\"loadData($event)\"\n  sortMode=\"multiple\"\n  styleClass=\"p-datatable-sm\"\n  [class]=\"tableSettings.cssClass\"\n  [selectionMode]=\"tableSettings.isRowClickable ? 'single' : null\"\n>\n  <ng-template pTemplate=\"header\" let-columns>\n    <!-- Column Names -->\n    <tr>\n      <ng-container *ngFor=\"let col of columns\">\n        <th *ngIf=\"col.sortable\" [pSortableColumn]=\"col.field\" [ngClass]=\"col.colClass ? col.colClass : 'column-width'\">\n          <div class=\"column-header-items\">\n            {{ col.headerText }}\n            <p-sortIcon id=\"{{ 'sort' + col.field }}\" [field]=\"col.field\"></p-sortIcon>\n\n            <!-- Filter if Date type -->\n            <p-columnFilter\n              *ngIf=\"col.type === 'date'\"\n              id=\"{{ 'filter' + col.field }}\"\n              type=\"date\"\n              display=\"menu\"\n              field=\"{{ col.field }}\"\n              [showMatchModes]=\"false\"\n              [showOperator]=\"false\"\n              [showAddButton]=\"false\"\n              [showApplyButton]=\"false\"\n            >\n              <ng-template pTemplate=\"filter\" let-filter=\"filterCallback\">\n                <p-calendar (onSelect)=\"onDateSelect($event, filter)\"></p-calendar>\n              </ng-template>\n            </p-columnFilter>\n          </div>\n        </th>\n\n        <th [ngClass]=\"col.colClass ? col.colClass : 'column-width'\" *ngIf=\"!col.sortable\">\n          {{ col.headerText }}\n        </th>\n      </ng-container>\n    </tr>\n\n    <tr>\n      <ng-container *ngFor=\"let col of columns\">\n        <th [ngClass]=\"col.colClass ? col.colClass : 'column-width'\">\n          <p-columnFilter\n            *ngIf=\"col.type === 'text' && !col.checkboxFilterOptions\"\n            type=\"text\"\n            id=\"{{ 'filter' + col.field }}\"\n            field=\"{{ col.field }}\"\n            [matchMode]=\"col.matchMode\"\n          >\n          </p-columnFilter>\n\n          <p-columnFilter\n            *ngIf=\"col.checkboxFilterOptions\"\n            field=\"{{ col.field }}\"\n            id=\"{{ 'filter' + col.field }}\"\n            class=\"hide-filter-button\"\n          >\n            <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\n              <p-multiSelect\n                id=\"{{ 'multiselect' + col.field }}\"\n                [ngModel]=\"value\"\n                [options]=\"col.checkboxFilterOptions\"\n                [placeholder]=\"'Select'\"\n                (onChange)=\"filter($event.value)\"\n              >\n              </p-multiSelect>\n            </ng-template>\n          </p-columnFilter>\n        </th>\n      </ng-container>\n    </tr>\n  </ng-template>\n\n  <!-- Rows data -->\n  <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\" let-ri=\"rowIndex\">\n    <tr (click)=\"onRowClick && onRowClick.emit(rowData)\" id=\"{{ 'tr' + rowData.id }}\">\n      <td *ngFor=\"let col of columns\">\n        <div *ngIf=\"col.type !== 'status'\" [ngClass]=\"{ 'fw-bold': col.bold }\">\n          {{ getFormattedText(col, rowData) }}\n        </div>\n\n        <div *ngIf=\"col.type === 'buttons'\" style=\"display: flex; justify-content: flex-end\">\n          <ng-container *ngFor=\"let button of col.buttons\">\n            <p-button\n              *ngIf=\"button.isVisible !== undefined ? button.isVisible(rowData) : true && !button.iconSvg\"\n              id=\"{{ 'btn' + button.label }}\"\n              class=\"btn btn-md\"\n              [ngClass]=\"determineButtonValue(button, 'btnClass', rowData)\"\n              (click)=\"handleButtonClick($event, button, rowData, ri)\"\n              [disabled]=\"button.isActive !== undefined ? !button.isActive(rowData) : false\"\n            >\n              {{ determineButtonValue(button, 'label', rowData) }}\n            </p-button>\n\n            <p-button\n              *ngIf=\"button.iconSvg\"\n              [text]=\"true\"\n              [rounded]=\"true\"\n              class=\"btn btn-md\"\n              [ngClass]=\"determineButtonValue(button, 'btnClass', rowData)\"\n              (click)=\"handleButtonClick($event, button, rowData, ri)\"\n              [disabled]=\"button.isActive !== undefined ? !button.isActive(rowData) : false\"\n              severity=\"secondary\"\n            >\n              <ng-template pTemplate=\"content\">\n                <span class=\"material-symbols-outlined\" style=\"font-size: 35px\">{{ button.iconSvg }}</span>\n              </ng-template>\n            </p-button>\n          </ng-container>\n        </div>\n      </td>\n    </tr>\n  </ng-template>\n  <!-- Message if no table data -->\n  <ng-template pTemplate=\"emptymessage\" let-columns>\n    <tr>\n      <td [attr.colspan]=\"columns.length\">No results found.</td>\n    </tr>\n  </ng-template>\n</p-table>\n", styles: ["::ng-deep-dropdown [styleclass=p-paginator-rpp-options]{border:none!important}::ng-deep tr{height:30px}::ng-deep .p-multiselect-label-container{width:0px}::ng-deep .hide-filter-button{min-width:200px}::ng-deep .hide-filter-button .p-column-filter-menu-button{display:none}::ng-deep .p-datatable-wrapper{margin-bottom:1rem;min-height:70vh;overflow:auto!important}::ng-deep .column-header-items{display:flex;align-items:center}::ng-deep td[colspan]{height:300px!important;font-weight:700;text-align:center!important;pointer-events:none}::ng-deep table{width:100%;cursor:default}.column-width{width:200px;background-color:#fff!important}::ng-deep .p-datatable.p-datatable-sm .p-datatable-tbody>tr>td{padding:.25rem 1rem}.buttons-container{display:flex;justify-content:center}\n"], dependencies: [{ kind: "component", type: i2.Table, selector: "p-table", inputs: ["frozenColumns", "frozenValue", "style", "styleClass", "tableStyle", "tableStyleClass", "paginator", "pageLinks", "rowsPerPageOptions", "alwaysShowPaginator", "paginatorPosition", "paginatorStyleClass", "paginatorDropdownAppendTo", "paginatorDropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showFirstLastIcon", "showPageLinks", "defaultSortOrder", "sortMode", "resetPageOnSort", "selectionMode", "selectionPageOnly", "contextMenuSelection", "contextMenuSelectionMode", "dataKey", "metaKeySelection", "rowSelectable", "rowTrackBy", "lazy", "lazyLoadOnInit", "compareSelectionBy", "csvSeparator", "exportFilename", "filters", "globalFilterFields", "filterDelay", "filterLocale", "expandedRowKeys", "editingRowKeys", "rowExpandMode", "scrollable", "scrollDirection", "rowGroupMode", "scrollHeight", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "virtualScrollDelay", "frozenWidth", "responsive", "contextMenu", "resizableColumns", "columnResizeMode", "reorderableColumns", "loading", "loadingIcon", "showLoader", "rowHover", "customSort", "showInitialSortBadge", "autoLayout", "exportFunction", "exportHeader", "stateKey", "stateStorage", "editMode", "groupRowsBy", "groupRowsByOrder", "responsiveLayout", "breakpoint", "paginatorLocale", "value", "columns", "first", "rows", "totalRecords", "sortField", "sortOrder", "multiSortMeta", "selection", "selectAll", "virtualRowHeight"], outputs: ["contextMenuSelectionChange", "selectAllChange", "selectionChange", "onRowSelect", "onRowUnselect", "onPage", "onSort", "onFilter", "onLazyLoad", "onRowExpand", "onRowCollapse", "onContextMenuSelect", "onColResize", "onColReorder", "onRowReorder", "onEditInit", "onEditComplete", "onEditCancel", "onHeaderCheckboxToggle", "sortFunction", "firstChange", "rowsChange", "onStateSave", "onStateRestore"] }, { kind: "directive", type: i3.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "directive", type: i2.SortableColumn, selector: "[pSortableColumn]", inputs: ["pSortableColumn", "pSortableColumnDisabled"] }, { kind: "component", type: i2.SortIcon, selector: "p-sortIcon", inputs: ["field"] }, { kind: "component", type: i2.ColumnFilter, selector: "p-columnFilter", inputs: ["field", "type", "display", "showMenu", "matchMode", "operator", "showOperator", "showClearButton", "showApplyButton", "showMatchModes", "showAddButton", "hideOnClear", "placeholder", "matchModeOptions", "maxConstraints", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "locale", "localeMatcher", "currency", "currencyDisplay", "useGrouping", "showButtons"] }, { kind: "component", type: i4.Button, selector: "p-button", inputs: ["type", "iconPos", "icon", "badge", "label", "disabled", "loading", "loadingIcon", "raised", "rounded", "text", "plain", "severity", "outlined", "link", "size", "style", "styleClass", "badgeClass", "ariaLabel"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "component", type: i5.Calendar, selector: "p-calendar", inputs: ["style", "styleClass", "inputStyle", "inputId", "name", "inputStyleClass", "placeholder", "ariaLabelledBy", "ariaLabel", "iconAriaLabel", "disabled", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "appendTo", "readonlyInput", "shortYearCutoff", "monthNavigator", "yearNavigator", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "required", "showOnFocus", "showWeek", "showClear", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "touchUI", "timeSeparator", "focusTrap", "showTransitionOptions", "hideTransitionOptions", "tabindex", "minDate", "maxDate", "disabledDates", "disabledDays", "yearRange", "showTime", "responsiveOptions", "numberOfMonths", "firstDayOfWeek", "locale", "view", "defaultDate"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onClear", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }, { kind: "component", type: i6.MultiSelect, selector: "p-multiSelect", inputs: ["id", "ariaLabel", "style", "styleClass", "panelStyle", "panelStyleClass", "inputId", "disabled", "readonly", "group", "filter", "filterPlaceHolder", "filterLocale", "overlayVisible", "tabindex", "appendTo", "dataKey", "name", "ariaLabelledBy", "displaySelectedLabel", "maxSelectedLabels", "selectionLimit", "selectedItemsLabel", "showToggleAll", "emptyFilterMessage", "emptyMessage", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "showHeader", "filterBy", "scrollHeight", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "filterMatchMode", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "display", "autocomplete", "showClear", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "defaultLabel", "placeholder", "options", "filterValue", "itemSize", "selectAll", "focusOnHover", "filterFields", "selectOnFocus", "autoOptionFocus"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onClear", "onPanelShow", "onPanelHide", "onLazyLoad", "onRemove", "onSelectAllChange"] }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTable, decorators: [{
            type: Component,
            args: [{ selector: 'primeng-table', template: "<p-table\n  #dataTable\n  [columns]=\"columns\"\n  [value]=\"data\"\n  [paginator]=\"!!tableSettings.showPaginator\"\n  [rows]=\"tableSettings.rowsPerPage || DEFAULT_ROWS_PER_PAGE\"\n  [showCurrentPageReport]=\"true\"\n  [currentPageReportTemplate]=\"'Showing {first} to {last} of {totalRecords} entries'\"\n  [rowsPerPageOptions]=\"tableSettings.rowsPerPageOptions || DEFAULT_ROWS_PER_PAGE_OPTIONS\"\n  [totalRecords]=\"tableSettings.totalRecords\"\n  [lazy]=\"true\"\n  (onLazyLoad)=\"loadData($event)\"\n  sortMode=\"multiple\"\n  styleClass=\"p-datatable-sm\"\n  [class]=\"tableSettings.cssClass\"\n  [selectionMode]=\"tableSettings.isRowClickable ? 'single' : null\"\n>\n  <ng-template pTemplate=\"header\" let-columns>\n    <!-- Column Names -->\n    <tr>\n      <ng-container *ngFor=\"let col of columns\">\n        <th *ngIf=\"col.sortable\" [pSortableColumn]=\"col.field\" [ngClass]=\"col.colClass ? col.colClass : 'column-width'\">\n          <div class=\"column-header-items\">\n            {{ col.headerText }}\n            <p-sortIcon id=\"{{ 'sort' + col.field }}\" [field]=\"col.field\"></p-sortIcon>\n\n            <!-- Filter if Date type -->\n            <p-columnFilter\n              *ngIf=\"col.type === 'date'\"\n              id=\"{{ 'filter' + col.field }}\"\n              type=\"date\"\n              display=\"menu\"\n              field=\"{{ col.field }}\"\n              [showMatchModes]=\"false\"\n              [showOperator]=\"false\"\n              [showAddButton]=\"false\"\n              [showApplyButton]=\"false\"\n            >\n              <ng-template pTemplate=\"filter\" let-filter=\"filterCallback\">\n                <p-calendar (onSelect)=\"onDateSelect($event, filter)\"></p-calendar>\n              </ng-template>\n            </p-columnFilter>\n          </div>\n        </th>\n\n        <th [ngClass]=\"col.colClass ? col.colClass : 'column-width'\" *ngIf=\"!col.sortable\">\n          {{ col.headerText }}\n        </th>\n      </ng-container>\n    </tr>\n\n    <tr>\n      <ng-container *ngFor=\"let col of columns\">\n        <th [ngClass]=\"col.colClass ? col.colClass : 'column-width'\">\n          <p-columnFilter\n            *ngIf=\"col.type === 'text' && !col.checkboxFilterOptions\"\n            type=\"text\"\n            id=\"{{ 'filter' + col.field }}\"\n            field=\"{{ col.field }}\"\n            [matchMode]=\"col.matchMode\"\n          >\n          </p-columnFilter>\n\n          <p-columnFilter\n            *ngIf=\"col.checkboxFilterOptions\"\n            field=\"{{ col.field }}\"\n            id=\"{{ 'filter' + col.field }}\"\n            class=\"hide-filter-button\"\n          >\n            <ng-template pTemplate=\"filter\" let-value let-filter=\"filterCallback\">\n              <p-multiSelect\n                id=\"{{ 'multiselect' + col.field }}\"\n                [ngModel]=\"value\"\n                [options]=\"col.checkboxFilterOptions\"\n                [placeholder]=\"'Select'\"\n                (onChange)=\"filter($event.value)\"\n              >\n              </p-multiSelect>\n            </ng-template>\n          </p-columnFilter>\n        </th>\n      </ng-container>\n    </tr>\n  </ng-template>\n\n  <!-- Rows data -->\n  <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\" let-ri=\"rowIndex\">\n    <tr (click)=\"onRowClick && onRowClick.emit(rowData)\" id=\"{{ 'tr' + rowData.id }}\">\n      <td *ngFor=\"let col of columns\">\n        <div *ngIf=\"col.type !== 'status'\" [ngClass]=\"{ 'fw-bold': col.bold }\">\n          {{ getFormattedText(col, rowData) }}\n        </div>\n\n        <div *ngIf=\"col.type === 'buttons'\" style=\"display: flex; justify-content: flex-end\">\n          <ng-container *ngFor=\"let button of col.buttons\">\n            <p-button\n              *ngIf=\"button.isVisible !== undefined ? button.isVisible(rowData) : true && !button.iconSvg\"\n              id=\"{{ 'btn' + button.label }}\"\n              class=\"btn btn-md\"\n              [ngClass]=\"determineButtonValue(button, 'btnClass', rowData)\"\n              (click)=\"handleButtonClick($event, button, rowData, ri)\"\n              [disabled]=\"button.isActive !== undefined ? !button.isActive(rowData) : false\"\n            >\n              {{ determineButtonValue(button, 'label', rowData) }}\n            </p-button>\n\n            <p-button\n              *ngIf=\"button.iconSvg\"\n              [text]=\"true\"\n              [rounded]=\"true\"\n              class=\"btn btn-md\"\n              [ngClass]=\"determineButtonValue(button, 'btnClass', rowData)\"\n              (click)=\"handleButtonClick($event, button, rowData, ri)\"\n              [disabled]=\"button.isActive !== undefined ? !button.isActive(rowData) : false\"\n              severity=\"secondary\"\n            >\n              <ng-template pTemplate=\"content\">\n                <span class=\"material-symbols-outlined\" style=\"font-size: 35px\">{{ button.iconSvg }}</span>\n              </ng-template>\n            </p-button>\n          </ng-container>\n        </div>\n      </td>\n    </tr>\n  </ng-template>\n  <!-- Message if no table data -->\n  <ng-template pTemplate=\"emptymessage\" let-columns>\n    <tr>\n      <td [attr.colspan]=\"columns.length\">No results found.</td>\n    </tr>\n  </ng-template>\n</p-table>\n", styles: ["::ng-deep-dropdown [styleclass=p-paginator-rpp-options]{border:none!important}::ng-deep tr{height:30px}::ng-deep .p-multiselect-label-container{width:0px}::ng-deep .hide-filter-button{min-width:200px}::ng-deep .hide-filter-button .p-column-filter-menu-button{display:none}::ng-deep .p-datatable-wrapper{margin-bottom:1rem;min-height:70vh;overflow:auto!important}::ng-deep .column-header-items{display:flex;align-items:center}::ng-deep td[colspan]{height:300px!important;font-weight:700;text-align:center!important;pointer-events:none}::ng-deep table{width:100%;cursor:default}.column-width{width:200px;background-color:#fff!important}::ng-deep .p-datatable.p-datatable-sm .p-datatable-tbody>tr>td{padding:.25rem 1rem}.buttons-container{display:flex;justify-content:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DatePipe }]; }, propDecorators: { onRowClick: [{
                type: Output
            }], loadDataService: [{
                type: Input
            }], data: [{
                type: Input
            }], columns: [{
                type: Input
            }], tableSettings: [{
                type: Input
            }], dropdowns: [{
                type: Input
            }] } });

class PrimeNgTableSettingsService {
    constructor(config) {
        this.config = config;
    }
    get libConfig() {
        return this.config;
    }
    setLibConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTableSettingsService, deps: [{ token: 'config' }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTableSettingsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTableSettingsService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }]; } });

const MINUTES_IN_MILLISECONDS = 60000;
const customDateTransform = (date, type, showHours) => {
    let dateFormat = 'dd MMM yyyy';
    if (!date) {
        return null;
    }
    let dateObj;
    if (showHours) {
        dateFormat += ' H:mm';
    }
    switch (type) {
        case 'iso':
            if (typeof date === 'string') {
                dateObj = new Date(date);
            }
            else {
                dateObj = new Date(date.setHours(0, 0, 0, 0));
            }
            return new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * MINUTES_IN_MILLISECONDS).toISOString();
        case 'dateTo':
            dateObj = new Date(date);
            if (dateObj.getDay() === new Date().getDay()) {
                dateObj = new Date();
            }
            else {
                dateObj = new Date(dateObj.setHours(23, 59, 59, 59));
            }
            return dateObj;
        default:
            return formatDate(date, dateFormat, 'en-GB').toLocaleUpperCase();
    }
};

class CustomDatePipe extends DatePipe {
    transform(date, type) {
        return customDateTransform(date, type);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CustomDatePipe, deps: null, target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: CustomDatePipe, name: "customDate" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CustomDatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'customDate',
                }]
        }] });

class PrimeNgTableModule {
    static forRoot(config) {
        return {
            ngModule: PrimeNgTableModule,
            providers: [PrimeNgTableSettingsService, { provide: 'config', useValue: config }],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTableModule, declarations: [PrimeNgTable, CustomDatePipe], imports: [TableModule,
            ButtonModule,
            CalendarModule,
            MultiSelectModule,
            BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            TooltipModule,
            DropdownModule,
            InputTextModule,
            InputNumberModule,
            InputTextModule,
            InputTextareaModule], exports: [PrimeNgTable, CustomDatePipe] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTableModule, providers: [
            TableModule,
            ButtonModule,
            CalendarModule,
            FormsModule,
            ReactiveFormsModule,
            MultiSelectModule,
            DatePipe,
            CustomDatePipe,
            TooltipModule,
            DropdownModule,
            InputTextModule,
            InputNumberModule,
            InputTextModule,
            InputTextareaModule,
        ], imports: [TableModule,
            ButtonModule,
            CalendarModule,
            MultiSelectModule,
            BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            TooltipModule,
            DropdownModule,
            InputTextModule,
            InputNumberModule,
            InputTextModule,
            InputTextareaModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PrimeNgTable, CustomDatePipe],
                    imports: [
                        TableModule,
                        ButtonModule,
                        CalendarModule,
                        MultiSelectModule,
                        BrowserModule,
                        BrowserAnimationsModule,
                        FormsModule,
                        ReactiveFormsModule,
                        TooltipModule,
                        DropdownModule,
                        InputTextModule,
                        InputNumberModule,
                        InputTextModule,
                        InputTextareaModule,
                    ],
                    exports: [PrimeNgTable, CustomDatePipe],
                    providers: [
                        TableModule,
                        ButtonModule,
                        CalendarModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MultiSelectModule,
                        DatePipe,
                        CustomDatePipe,
                        TooltipModule,
                        DropdownModule,
                        InputTextModule,
                        InputNumberModule,
                        InputTextModule,
                        InputTextareaModule,
                    ],
                }]
        }] });

/*
 * Public API Surface of cp-primeng-table
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CustomDatePipe, PrimeNgTable, PrimeNgTableModule };
//# sourceMappingURL=cp-primeng-table.mjs.map
