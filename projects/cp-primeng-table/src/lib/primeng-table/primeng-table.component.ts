import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import {
  DEFAULT_ROWS_PER_PAGE,
  DEFAULT_ROWS_PER_PAGE_OPTIONS,
  DEFAULT_TABLE_SETTINGS,
} from '../constants/primeng-table';
import { FilterValues, TableColumn, TableSettings } from '../models/primeng-table.model';
import {
  buildCheckboxFilterOptions,
  deepCloneObject,
  determineButtonValue,
  transformFiltersForRequest,
  transformSortForRequest,
} from '../helpers/primeng-table-helpers';

@Component({
  selector: 'primeng-table',
  templateUrl: './primeng-table.component.html',
  styleUrls: ['./primeng-table.component.scss'],
})
export class PrimeNgTable implements OnInit {
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();

  @Input() loadDataService!: (params: any) => Observable<any>;
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() tableSettings: TableSettings = DEFAULT_TABLE_SETTINGS;
  @Input() dropdowns!: Record<string, any[]>;

  determineButtonValue = determineButtonValue;
  buildCheckboxFilterOptions = buildCheckboxFilterOptions;

  lastEventLoaded!: any;
  totalRecords!: number;

  DEFAULT_ROWS_PER_PAGE = DEFAULT_ROWS_PER_PAGE;
  DEFAULT_ROWS_PER_PAGE_OPTIONS = DEFAULT_ROWS_PER_PAGE_OPTIONS;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.lastEventLoaded = {};

    this.columns.forEach((col) => {
      if (col.checkboxFilterOptions) {
        col.checkboxFilterOptions = this.buildCheckboxFilterOptions(col.checkboxFilterOptions as string[]);
      }
    });
  }

  loadData(event: any): void {
    if (!this.loadDataService) {
      return;
    }

    this.lastEventLoaded = deepCloneObject(event);
    const currentPage = (event.first as number) / (event.rows as number) + 1;

    let params = {
      filter: transformFiltersForRequest(event.filters as FilterValues),
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

        const { page, content } = res.data!;

        if (!content) {
          this.data = [];
        } else {
          this.data = content;
        }

        this.totalRecords = page?.totalElements!;
        this.tableSettings.totalRecords = this.totalRecords;
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }

  reloadData(): void {
    this.loadData(this.lastEventLoaded);
  }

  updateEntity<T extends { id?: number }>(updatedData: T): void {
    const index = this.data.findIndex((row) => row.id === updatedData.id);

    if (index !== -1) {
      const updatedEntity = { ...this.data[index], ...updatedData };
      this.data[index] = updatedEntity;
    }
  }

  updateTableData(updatedData: any): void {
    if (!updatedData) {
      return;
    }

    this.data = [...updatedData];
  }

  getFormattedText(col: any, rowData: any): any {
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

  onDateSelect(value: Date, filterCallback: Function): void {
    if (value) {
      const timezoneOffset = value.getTimezoneOffset() * 60000;
      const adjustedDate = new Date(value.getTime() - timezoneOffset);
      const isoFormattedDate = adjustedDate.toISOString().slice(0, -1).split('T')[0];

      filterCallback(isoFormattedDate);
    }
  }

  handleButtonClick(event: MouseEvent, button: any, rowData: any, rowIndex: number): void {
    event.stopPropagation();
    button.action(rowData, rowIndex);
  }
}
