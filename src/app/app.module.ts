import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { PrimeNgTableModule } from 'cp-primeng-table';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, PrimeNgTableModule],
  providers: [DatePipe],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
