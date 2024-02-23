import { ColumnCheckboxFilterOptions, FilterValues, SortValues, TableButton } from '../models/primeng-table.model';
export declare const transformSortForRequest: (criteria: SortValues[]) => string[];
export declare const transformFiltersForRequest: (filters: FilterValues) => string[];
export declare const getShorthandMatchMode: (matchMode: string) => string;
export declare const buildCheckboxFilterOptions: (filterOptions: string[]) => ColumnCheckboxFilterOptions[];
export declare const deepCloneObject: (objectToClone: any) => any;
export declare const determineButtonValue: (button: TableButton, property: string, rowData: any) => string | any;
