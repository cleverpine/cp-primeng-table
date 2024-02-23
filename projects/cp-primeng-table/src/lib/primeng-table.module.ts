import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgTable } from './primeng-table/primeng-table.component';
import { PrimeNgTableConfig } from './models/primeng-table-config';
import { PrimeNgTableSettingsService } from './services/primeng-table-settings.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [PrimeNgTable, CustomDatePipe],
  imports: [
    TableModule,
    ButtonModule,
    CalendarModule,
    MultiSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
  ],
  exports: [PrimeNgTable, CustomDatePipe],
  providers: [
    TableModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DatePipe,
    CustomDatePipe,
    TooltipModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
  ],
})
export class PrimeNgTableModule {
  static forRoot(config: PrimeNgTableConfig): ModuleWithProviders<PrimeNgTableModule> {
    return {
      ngModule: PrimeNgTableModule,
      providers: [PrimeNgTableSettingsService, { provide: 'config', useValue: config }],
    };
  }
}
