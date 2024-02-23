import { PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as i0 from "@angular/core";
export declare class CustomDatePipe extends DatePipe implements PipeTransform {
    transform(date: any, type?: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CustomDatePipe, "customDate", false>;
}
