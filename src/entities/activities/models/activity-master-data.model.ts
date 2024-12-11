import { useQuery } from 'react-query';
import { DayOfWeek, dayOfWeeksApiClient } from '../api/day-of-weeks-api.client';
import { TimeOfDay, timeOfDaysApiClient } from '../api/time-of-days-api.client';

export function useDayOfWeeksQuery() {
  const { data } = useQuery({
    queryKey: ['dayOfWeeks'],
    queryFn: dayOfWeeksApiClient.get
  });

  return {
    data: data ?? ([] as DayOfWeek[])
  };
}

export function useTimeOfDayQuery() {
  const { data } = useQuery({
    queryKey: ['timeOfDays'],
    queryFn: timeOfDaysApiClient.get
  });

  return {
    data: data ?? ([] as TimeOfDay[])
  };
}
