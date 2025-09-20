import { ActivityResponse } from '../../../../../entities/activities/api/activity-api.client';
import {
  ExtraRequestTypes,
  RequestTypes
} from '../../../../../entities/activities/config/constants/request-activity-metadata.constant';
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
      results.push(
        {
          date: new Date(item.requestChangeDay as string),
          ...item
        },
        {
          date: new Date(item.compensatoryDay as string),
          ...item,
          requestType: ExtraRequestTypes.COMPENSATORY
        }
      );
      return;
    }
  });

  return results;
}

export type TotalActivities = {
  working: number;
  late: number;
  absence: number;
  compensatory: number;
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

      if (ExtraRequestTypes.COMPENSATORY === item.requestType) {
        acc.compensatory++;
      }

      return acc;
    },
    { working: 0, late: 0, absence: 0, compensatory: 0 }
  );
}

export function groupCalendarItemsByRequestType(
  items: CalendarItem[]
): Record<string, CalendarItem[]> {
  const calendarMap = items.reduce((acc, item) => {
    if (!acc[item.requestType]) {
      acc[item.requestType] = [];
    }

    acc[item.requestType].push(item);

    return acc;
  }, {} as Record<string, CalendarItem[]>);

  Object.keys(calendarMap).forEach(key => {
    calendarMap[key] = calendarMap[key].sort((a, b) => {
      if (a.timeOfDay.fromTime < b.timeOfDay.fromTime) {
        return -1;
      }
      if (a.timeOfDay.fromTime > b.timeOfDay.fromTime) {
        return 1;
      }

      return 0;
    });
  });

  return calendarMap;
}
