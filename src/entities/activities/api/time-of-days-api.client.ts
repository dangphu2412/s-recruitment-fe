import { authorizedHttpClient } from '../../../shared/api';
import { Page } from '../../../shared/pagination/offset-paging';

export type TimeOfDay = {
  id: string;
  name: string;
  fromTime: string;
  toTime: string;
};

export type CreateTimeOfDayPayload = {
  id: string;
  name: string;
};

export const timeOfDaysApiClient = {
  get: () => {
    return authorizedHttpClient.request<Page<TimeOfDay>>({
      url: '/time-of-days',
      method: 'get'
    });
  },
  createOne: (data: CreateTimeOfDayPayload) => {
    return authorizedHttpClient.request<void>({
      url: '/time-of-days',
      method: 'post',
      data
    });
  }
};
