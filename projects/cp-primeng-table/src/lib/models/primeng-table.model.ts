export interface PageableWithoutSort {
  page?: number;
  size?: number;
}

export interface Filter {
  readonly value: string;
  readonly matchMode: string;
}

export interface FilterValues {
  readonly [key: string]: Filter | Filter[];
}

export interface SortValues {
  readonly field: string;
  readonly order: number;
}

export interface TableStatus {
  readonly label: string;
  readonly value: string;
}

export interface ColumnCheckboxFilterOptions {
  readonly label: string;
  readonly value: string;
}

export interface TableButtonTooltip {
  readonly tooltipText?: string;
  readonly tooltipPosition?: string;
  readonly positionLeft?: number;
}

export interface TableButton {
  readonly label?: ((item?: any) => string) | string;
  readonly iconSvg?: ((item?: any) => string) | string;
  readonly isVisible?: ((item?: any) => boolean) | boolean;
  readonly isActive?: ((item?: any) => boolean) | boolean;
  readonly btnClass?: ((item?: any) => string) | string;
  readonly btnTooltip?: ((item?: any) => TableButtonTooltip) | TableButtonTooltip;
  readonly action?: (item?: any, index?: number) => void;
  readonly width?: number;
}

export interface TableColumn {
  readonly field?: string;
  readonly headerText?: string;
  readonly filterable?: boolean;
  readonly sortable?: boolean;
  readonly matchMode?: string;
  readonly type?: string;
  readonly buttons?: TableButton[];
  readonly bold?: boolean;
  checkboxFilterOptions?: string[] | ColumnCheckboxFilterOptions[];
}

export interface TableSettings {
  totalRecords: number;
  readonly showPaginator?: boolean;
  readonly showFooter?: boolean;
  readonly isFiltersHided?: boolean;
  readonly rowsPerPage?: number;
  readonly rowsPerPageOptions?: number[];
  readonly isRowClickable?: boolean;
  readonly noContentMessage?: string;
  readonly cssClass?: string;
}

export interface TableParams {
  readonly filter?: string[];
  readonly sort?: string[];
  readonly pageable?: PageableWithoutSort;
}
