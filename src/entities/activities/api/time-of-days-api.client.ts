import { authorizedHttpClient } from '../../../shared/api';
import { Page } from '../../../shared/models';

export type TimeOfDay = {
  id: string;
  name: string;
};

export const timeOfDaysApiClient = {
  get: () => {
    return authorizedHttpClient.request<Page<TimeOfDay>>({
      url: '/time-of-days',
      method: 'get'
    });
  }
};
