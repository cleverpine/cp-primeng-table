import { Injectable, Inject } from '@angular/core';

import { PrimeNgTableConfig } from '../models/primeng-table-config';

@Injectable()
export class PrimeNgTableSettingsService {
  constructor(@Inject('config') private config: PrimeNgTableConfig) {}

  get libConfig() {
    return this.config;
  }

  setLibConfig(newConfig: PrimeNgTableConfig) {
    this.config = { ...this.config, ...newConfig };
  }
}
