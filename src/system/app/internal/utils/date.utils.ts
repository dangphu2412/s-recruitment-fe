import { add, sub } from 'date-fns';
import { DateRange } from '../../../domain/clients/filter.api';

export function getFilterDateRange(): DateRange<string> {
  const today = new Date();

  return {
    fromDate: sub(today, { days: 30 }).toString(),
    toDate: add(today, { days: 30 }).toString()
  };
}
