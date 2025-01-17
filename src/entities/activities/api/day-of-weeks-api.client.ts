import { Page } from 'src/shared/models';
import { authorizedHttpClient } from '../../../shared/api';

export type DayOfWeek = {
  id: string;
  name: string;
};

export const dayOfWeeksApiClient = {
  get: () => {
    return authorizedHttpClient.request<Page<DayOfWeek>>({
      url: '/day-of-weeks',
      method: 'get'
    });
  }
};
