import { Injectable, Inject } from '@angular/core';
import * as i0 from "@angular/core";
export class PrimeNgTableSettingsService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWVuZy10YWJsZS1zZXR0aW5ncy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY3AtcHJpbWVuZy10YWJsZS9zcmMvbGliL3NlcnZpY2VzL3ByaW1lbmctdGFibGUtc2V0dGluZ3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLbkQsTUFBTSxPQUFPLDJCQUEyQjtJQUN0QyxZQUFzQyxNQUEwQjtRQUExQixXQUFNLEdBQU4sTUFBTSxDQUFvQjtJQUFHLENBQUM7SUFFcEUsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxZQUFZLENBQUMsU0FBNkI7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFNBQVMsRUFBRSxDQUFDO0lBQ2pELENBQUM7K0dBVFUsMkJBQTJCLGtCQUNsQixRQUFRO21IQURqQiwyQkFBMkI7OzRGQUEzQiwyQkFBMkI7a0JBRHZDLFVBQVU7OzBCQUVJLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQcmltZU5nVGFibGVDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvcHJpbWVuZy10YWJsZS1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJpbWVOZ1RhYmxlU2V0dGluZ3NTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoQEluamVjdCgnY29uZmlnJykgcHJpdmF0ZSBjb25maWc6IFByaW1lTmdUYWJsZUNvbmZpZykge31cblxuICBnZXQgbGliQ29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgfVxuXG4gIHNldExpYkNvbmZpZyhuZXdDb25maWc6IFByaW1lTmdUYWJsZUNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0geyAuLi50aGlzLmNvbmZpZywgLi4ubmV3Q29uZmlnIH07XG4gIH1cbn1cbiJdfQ==