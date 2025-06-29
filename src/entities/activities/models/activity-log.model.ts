import { useMutation, useQuery } from 'react-query';
import {
  activityLogApiClient,
  FindAnalyticLogQuery
} from '../api/activity-log-api.client';
import { create } from 'zustand';
import { DEFAULT_PAGINATION } from '../../../shared/models';
import { endOfDay, subWeeks } from 'date-fns';
import { BoxItem } from '../../../shared/models/combobox.api';

export function useActivityLogAnalytic(
  findAnalyticLogQuery?: FindAnalyticLogQuery
) {
  return useQuery({
    queryKey: ['analytic-logs', findAnalyticLogQuery],
    queryFn: () =>
      activityLogApiClient.findAnalyticLogs(findAnalyticLogQuery ?? {})
  });
}

export function useV2ActivityLogAnalytic(
  findAnalyticLogQuery: FindAnalyticLogQuery
) {
  return useQuery({
    queryKey: ['analytic-logs-v2', findAnalyticLogQuery],
    queryFn: () => activityLogApiClient.findV2AnalyticLogs(findAnalyticLogQuery)
  });
}

export function useMutateSyncLogs() {
  return useMutation({
    mutationKey: 'analytic-logs',
    mutationFn: activityLogApiClient.uploadLogs
  });
}

export function useMutateDownloadReport() {
  return useMutation({
    mutationKey: 'download-report-logs',
    mutationFn: activityLogApiClient.downloadReportLogs
  });
}

export type ActivityLogsSearch = {
  query?: string;
  page: number;
  size: number;
  fromDate: Date | null;
  toDate: Date | null;
  authors: BoxItem[];
  workStatus: string[];
};

type ActivityLogListModel = {
  values: ActivityLogsSearch;
  searchValues: ActivityLogsSearch;
  reset: () => void;
  submitSearch: () => void;
  submitValues: (values: Partial<ActivityLogsSearch>) => void;
  setValue: (key: string, value: any) => void;
  setValues: (values: Partial<ActivityLogsSearch>) => void;
  toggleValue: (key: 'workStatus', value: any) => void;
};

const initialState: ActivityLogsSearch = {
  ...DEFAULT_PAGINATION,
  fromDate: subWeeks(new Date(), 1),
  toDate: endOfDay(new Date()),
  authors: [],
  workStatus: []
};

export const useActivityLogListStore = create<ActivityLogListModel>(set => {
  return {
    values: initialState,
    searchValues: initialState,
    submitValues: (values: Partial<ActivityLogsSearch>) => {
      set(state => {
        return {
          ...state,
          searchValues: {
            ...state.values,
            ...values
          }
        };
      });
    },
    setValues: (values: Partial<ActivityLogsSearch>) => {
      set(state => {
        return {
          ...state,
          values: {
            ...state.values,
            ...values
          }
        };
      });
    },
    submitSearch: () => {
      set(state => {
        return {
          ...state,
          searchValues: {
            ...state.searchValues,
            ...state.values
          }
        };
      });
    },
    reset: () => {
      set(state => ({
        ...state,
        values: initialState,
        searchValues: initialState
      }));
    },
    setValue: (key, value: any) => {
      set(state => {
        return {
          ...state,
          values: {
            ...state.values,
            [key]: value
          }
        };
      });
    },
    toggleValue: (key, value) => {
      set(state => {
        const values = state.values[key] || [];

        const newValues = values.includes(value)
          ? values.filter((v: string) => v !== value)
          : [...values, value];
        return {
          ...state,
          values: {
            ...state.values,
            [key]: newValues
          }
        };
      });
    }
  };
});

export const ACTIVITY_LOGS_QUERY_KEY = 'activity-logs';

export function useActivityLogsList() {
  const searchValues = useActivityLogListStore(state => state.searchValues);

  return useQuery({
    queryKey: [ACTIVITY_LOGS_QUERY_KEY, searchValues],
    queryFn: () =>
      activityLogApiClient.findLogs({
        ...searchValues,
        authors: searchValues.authors.map(author => author.value)
      })
  });
}
