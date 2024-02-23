import { ModuleWithProviders } from '@angular/core';
import { PrimeNgTableConfig } from './models/primeng-table-config';
import * as i0 from "@angular/core";
import * as i1 from "./primeng-table/primeng-table.component";
import * as i2 from "./pipes/custom-date.pipe";
import * as i3 from "primeng/table";
import * as i4 from "primeng/button";
import * as i5 from "primeng/calendar";
import * as i6 from "primeng/multiselect";
import * as i7 from "@angular/platform-browser";
import * as i8 from "@angular/platform-browser/animations";
import * as i9 from "@angular/forms";
import * as i10 from "primeng/tooltip";
import * as i11 from "primeng/dropdown";
import * as i12 from "primeng/inputtext";
import * as i13 from "primeng/inputnumber";
import * as i14 from "primeng/inputtextarea";
export declare class PrimeNgTableModule {
    static forRoot(config: PrimeNgTableConfig): ModuleWithProviders<PrimeNgTableModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeNgTableModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PrimeNgTableModule, [typeof i1.PrimeNgTable, typeof i2.CustomDatePipe], [typeof i3.TableModule, typeof i4.ButtonModule, typeof i5.CalendarModule, typeof i6.MultiSelectModule, typeof i7.BrowserModule, typeof i8.BrowserAnimationsModule, typeof i9.FormsModule, typeof i9.ReactiveFormsModule, typeof i10.TooltipModule, typeof i11.DropdownModule, typeof i12.InputTextModule, typeof i13.InputNumberModule, typeof i12.InputTextModule, typeof i14.InputTextareaModule], [typeof i1.PrimeNgTable, typeof i2.CustomDatePipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PrimeNgTableModule>;
}
