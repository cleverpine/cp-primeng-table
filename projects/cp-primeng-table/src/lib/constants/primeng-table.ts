import { TableSettings } from '../models/primeng-table.model';

export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 20, 30, 40];
export const DEFAULT_ROWS_PER_PAGE = 10;
export const DEFAULT_TABLE_SETTINGS: TableSettings = {
  showPaginator: true,
  rowsPerPage: DEFAULT_ROWS_PER_PAGE,
  rowsPerPageOptions: DEFAULT_ROWS_PER_PAGE_OPTIONS,
  totalRecords: 0,
  isRowClickable: false,
  cssClass: '',
};
export const ENABLE_FILTER_SORT = {
  filterable: true,
  sortable: true,
};
