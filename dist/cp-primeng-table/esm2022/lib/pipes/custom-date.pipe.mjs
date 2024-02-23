import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import { customDateTransform } from '../helpers/custom-date-transform';
import * as i0 from "@angular/core";
export class CustomDatePipe extends DatePipe {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWRhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NwLXByaW1lbmctdGFibGUvc3JjL2xpYi9waXBlcy9jdXN0b20tZGF0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7QUFLdkUsTUFBTSxPQUFPLGNBQWUsU0FBUSxRQUFRO0lBQ2pDLFNBQVMsQ0FBQyxJQUFTLEVBQUUsSUFBVTtRQUN0QyxPQUFPLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDOytHQUhVLGNBQWM7NkdBQWQsY0FBYzs7NEZBQWQsY0FBYztrQkFIMUIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsWUFBWTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IGN1c3RvbURhdGVUcmFuc2Zvcm0gfSBmcm9tICcuLi9oZWxwZXJzL2N1c3RvbS1kYXRlLXRyYW5zZm9ybSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2N1c3RvbURhdGUnLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21EYXRlUGlwZSBleHRlbmRzIERhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIG92ZXJyaWRlIHRyYW5zZm9ybShkYXRlOiBhbnksIHR5cGU/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBjdXN0b21EYXRlVHJhbnNmb3JtKGRhdGUsIHR5cGUpO1xuICB9XG59XG4iXX0=