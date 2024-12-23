import { authorizedHttpClient } from '../../../shared/api';

export type TimeOfDay = {
  id: string;
  name: string;
};

export const timeOfDaysApiClient = {
  get: () => {
    return authorizedHttpClient.request<TimeOfDay[]>({
      url: '/time-of-days',
      method: 'get'
    });
  }
};
