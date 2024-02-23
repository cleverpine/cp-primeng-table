import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { customDateTransform } from '../helpers/custom-date-transform';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
  override transform(date: any, type?: any): any {
    return customDateTransform(date, type);
  }
}
