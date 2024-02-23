import {
  ColumnCheckboxFilterOptions,
  Filter,
  FilterValues,
  SortValues,
  TableButton,
} from '../models/primeng-table.model';

export const transformSortForRequest = (criteria: SortValues[]): string[] =>
  criteria.map((item) => {
    const direction = item.order === 1 ? 'asc' : 'desc';
    return `${item.field}:${direction}`;
  });

export const transformFiltersForRequest = (filters: FilterValues): string[] => {
  const transformedArray: string[] = [];

  for (const key in filters) {
    const filterValue = filters[key];

    if (!filterValue) {
      continue;
    }

    (Array.isArray(filterValue) ? filterValue : [filterValue]).forEach((filter: Filter) => {
      const shorthandMatchMode = getShorthandMatchMode(filter.matchMode);
      if (filter.value) {
        if (Array.isArray(filter.value)) {
          // when multiple values are selected, we need to use 'in' operator
          const value = filter.value.join(';');
          transformedArray.push(`${key}:in:${value}`);
        } else {
          transformedArray.push(`${key}:${shorthandMatchMode}:${filter.value}`);
        }
      }
    });
  }

  return transformedArray;
};

export const getShorthandMatchMode = (matchMode: string): string => {
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

export const buildCheckboxFilterOptions = (filterOptions: string[]): ColumnCheckboxFilterOptions[] =>
  filterOptions.map((filterOption) => ({
    label: filterOption,
    value: filterOption,
  }));

export const deepCloneObject = (objectToClone: any): any => {
  if (objectToClone === null || typeof objectToClone !== 'object') {
    return objectToClone;
  }

  if (Array.isArray(objectToClone)) {
    return objectToClone.map(deepCloneObject);
  }

  if (objectToClone instanceof Object) {
    const clonedObject: { [key: string]: any } = {};
    for (const key in objectToClone) {
      if (Object.hasOwnProperty.call(objectToClone, key)) {
        clonedObject[key] = deepCloneObject(objectToClone[key]);
      }
    }
    return clonedObject;
  }
};

export const determineButtonValue = (button: TableButton, property: string, rowData: any): string | any => {
  const propValue = button[property as keyof TableButton] as any;

  if (propValue && typeof propValue === 'function') {
    return propValue(rowData);
  }

  return propValue ?? '';
};
