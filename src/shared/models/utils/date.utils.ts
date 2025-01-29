import { format } from 'date-fns';
import { isNil } from './simple-assertion.utils';

const DATE_FORMAT = 'dd-MM-yyyy';
const INPUT_DATE_FORMAT = 'yyyy-MM-dd';
const DATE_TIME_FORMAT = 'dd-MM-yyyy HH:mm:ss';

export function formatDate(date: Date | string | null | undefined): string {
  if (isNil(date)) {
    return '';
  }

  if ('' === date) {
    return '';
  }

  if (typeof date === 'string') {
    return format(new Date(date), DATE_FORMAT);
  }

  return format(date, DATE_FORMAT);
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (isNil(date)) {
    return '';
  }

  if ('' === date) {
    return '';
  }

  if (typeof date === 'string') {
    return format(new Date(date), DATE_TIME_FORMAT);
  }

  return format(date, DATE_TIME_FORMAT);
}

export function formatToInputDate(
  date: Date | string | null | undefined
): string {
  if (isNil(date)) {
    return '';
  }

  if ('' === date) {
    return '';
  }

  if (typeof date === 'string') {
    return format(new Date(date), INPUT_DATE_FORMAT);
  }

  return format(date, INPUT_DATE_FORMAT);
}
