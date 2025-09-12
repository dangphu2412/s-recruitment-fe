import { format } from 'date-fns';
import { isNil } from './simple-assertion.utils';

const DATE_FORMAT = 'dd-MM-yyyy';
const INPUT_DATE_FORMAT = 'yyyy-MM-dd';
const MONTH_FORMAT = 'yyyy-MM';
const DATE_TIME_FORMAT = 'dd-MM-yyyy HH:mm:ss';
const DATE_TIME_TEXT_FORMAT = 'MMM dd, yyyy HH:mm:ss';

type DateInput = Date | string | null | undefined;

function formatRoot(date: DateInput, formatT: string): string {
  if (isNil(date)) {
    return '';
  }

  if ('' === date) {
    return '';
  }

  if (typeof date === 'string') {
    return format(new Date(date), formatT);
  }

  return format(date, formatT);
}

export function formatDayOfWeekAndDate(date: DateInput): string {
  return formatRoot(date, 'EEEE dd-MM-yyyy HH:mm:ss');
}

export function formatDate(date: DateInput): string {
  return formatRoot(date, DATE_FORMAT);
}

export function formatMonth(date: DateInput): string {
  return formatRoot(date, MONTH_FORMAT);
}

export function formatDateTime(date: DateInput): string {
  return formatRoot(date, DATE_TIME_FORMAT);
}

export function formatDateTimeText(date: DateInput): string {
  return formatRoot(date, DATE_TIME_TEXT_FORMAT);
}

export function formatToInputDate(date: DateInput): string {
  return formatRoot(date, INPUT_DATE_FORMAT);
}
