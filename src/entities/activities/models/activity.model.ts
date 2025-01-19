import { create } from 'zustand/react';
import { DateRange } from '../../../shared/models/filter.api';
import { useQuery } from 'react-query';
import { activityApiClient } from '../api/activity-api.client';
import { EMPTY_ARRAY } from '../../../shared/config';
import { endOfMonth, startOfMonth } from 'date-fns';

type ActivityStore = DateRange & {
  submitValues: (
    values: Partial<Pick<ActivityStore, 'fromDate' | 'toDate'>>
  ) => void;
};

export const ACTIVITY_QUERY_KEY = 'activities';

export function useActivityQuery() {
  const fromDate = useActivityStore(state => state.fromDate);
  const toDate = useActivityStore(state => state.toDate);

  const params = {
    fromDate: fromDate,
    toDate: toDate
  };

  const { data, isFetching } = useQuery({
    queryKey: [ACTIVITY_QUERY_KEY, params],
    queryFn: () => activityApiClient.findActivities(params)
  });

  return {
    data: data ?? EMPTY_ARRAY,
    isFetching
  };
}

export const useActivityStore = create<ActivityStore>(set => ({
  fromDate: startOfMonth(new Date()),
  toDate: endOfMonth(new Date()),
  submitValues: (
    values: Partial<Pick<ActivityStore, 'fromDate' | 'toDate'>>
  ) => {
    set(state => {
      return {
        ...state,
        ...values
      };
    });
  }
}));

