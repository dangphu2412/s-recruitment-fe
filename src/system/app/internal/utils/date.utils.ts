import { add, format, sub } from 'date-fns';
import { DateRange } from '../../../domain/clients/filter.api';

export function getFilterDateRange(): DateRange<Date> {
  const today = new Date();

  return {
    fromDate: sub(today, { days: 30 }),
    toDate: add(today, { days: 30 })
  };
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
