import { formatDate } from '@angular/common';

const MINUTES_IN_MILLISECONDS: number = 60000;

export const customDateTransform = (date: any, type?: string, showHours?: boolean): any => {
  let dateFormat = 'dd MMM yyyy';

  if (!date) {
    return null;
  }

  let dateObj;
  if (showHours) {
    dateFormat += ' H:mm';
  }

  switch (type) {
    case 'iso':
      if (typeof date === 'string') {
        dateObj = new Date(date);
      } else {
        dateObj = new Date(date.setHours(0, 0, 0, 0));
      }

      return new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * MINUTES_IN_MILLISECONDS).toISOString();
    case 'dateTo':
      dateObj = new Date(date);
      if (dateObj.getDay() === new Date().getDay()) {
        dateObj = new Date();
      } else {
        dateObj = new Date(dateObj.setHours(23, 59, 59, 59));
      }
      return dateObj;
    default:
      return formatDate(date, dateFormat, 'en-GB').toLocaleUpperCase();
  }
};
