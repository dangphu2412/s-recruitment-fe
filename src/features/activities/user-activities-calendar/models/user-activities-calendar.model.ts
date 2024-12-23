import { ActivityResponse } from '../../../../entities/activities/api/activity-api.client';
import { RequestTypes } from '../../../../entities/activities/config/constants/request-activity-metadata.constant';
import { addWeeks, endOfMonth, setDay } from 'date-fns';

export type CalendarItem = {
  requestType: string;
  date: Date;
} & ActivityResponse;

export function mapToCalendarItems(
  items: ActivityResponse[],
  startDateOfMonth: Date
): CalendarItem[] {
  const results: CalendarItem[] = [];

  items.forEach(item => {
    if (RequestTypes.WORKING === item.requestType) {
      let occurrenceDate = setDay(startDateOfMonth, +item.dayOfWeek.id, {
        weekStartsOn: 0
      });
      const endDateOfMonth = endOfMonth(startDateOfMonth);

      while (occurrenceDate <= endDateOfMonth) {
        results.push({
          date: occurrenceDate,
          ...item
        });

        occurrenceDate = addWeeks(occurrenceDate, 1);
      }
      return;
    }

    if (RequestTypes.LATE === item.requestType) {
      results.push({
        date: new Date(item.requestChangeDay as string),
        ...item
      });
      return;
    }

    if (RequestTypes.ABSENCE === item.requestType) {
      results.push({
        date: new Date(item.compensatoryDay as string),
        ...item
      });
      return;
    }
  });

  return results;
}

export type TotalActivities = {
  working: number;
  late: number;
  absence: number;
};
export function accumulateTotalActivities(
  items: CalendarItem[]
): TotalActivities {
  return items.reduce(
    (acc, item) => {
      if (RequestTypes.WORKING === item.requestType) {
        acc.working++;
      }

      if (RequestTypes.LATE === item.requestType) {
        acc.late++;
      }

      if (RequestTypes.ABSENCE === item.requestType) {
        acc.absence++;
      }

      return acc;
    },
    { working: 0, late: 0, absence: 0 }
  );
}
