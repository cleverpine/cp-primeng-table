import { PrimeNgTableConfig } from '../models/primeng-table-config';
import * as i0 from "@angular/core";
export declare class PrimeNgTableSettingsService {
    private config;
    constructor(config: PrimeNgTableConfig);
    get libConfig(): PrimeNgTableConfig;
    setLibConfig(newConfig: PrimeNgTableConfig): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeNgTableSettingsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PrimeNgTableSettingsService>;
}
