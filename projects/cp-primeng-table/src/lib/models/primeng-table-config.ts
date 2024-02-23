import { TableColumn, TableSettings } from './primeng-table.model';

export interface PrimeNgTableConfig {
  readonly columns?: TableColumn[];
  readonly tableSettings?: TableSettings;
  readonly data?: any[];
}
