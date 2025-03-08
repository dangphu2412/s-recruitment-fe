import { useQuery } from 'react-query';
import { DayOfWeek, dayOfWeeksApiClient } from '../api/day-of-weeks-api.client';
import { TimeOfDay, timeOfDaysApiClient } from '../api/time-of-days-api.client';
import { CACHE_INFINITY } from '../../../shared/config/constants/react-query';
import {
  activityMdmApiClient,
  TrackedUsers
} from '../api/activity-mdm-api.client';

export function useDayOfWeeksQuery() {
  const { data } = useQuery({
    queryKey: ['dayOfWeeks'],
    queryFn: dayOfWeeksApiClient.get,
    ...CACHE_INFINITY
  });

  return {
    data: data?.items ?? ([] as DayOfWeek[])
  };
}

export function useTimeOfDayQuery() {
  const { data } = useQuery({
    queryKey: ['timeOfDays'],
    queryFn: timeOfDaysApiClient.get,
    ...CACHE_INFINITY
  });

  return {
    data: data?.items ?? ([] as TimeOfDay[])
  };
}

export function useTrackedUsers() {
  const { data } = useQuery({
    queryKey: ['trackedUsers'],
    queryFn: activityMdmApiClient.getUsers,
    ...CACHE_INFINITY
  });

  return {
    data: data?.items ?? ([] as TrackedUsers[])
  };
}
