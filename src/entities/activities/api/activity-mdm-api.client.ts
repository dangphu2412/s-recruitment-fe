import { Page } from 'src/shared/models';
import { authorizedHttpClient } from '../../../shared/api';

/**
 * {
 *       "uid": 232,
 *       "role": 0,
 *       "password": "",
 *       "name": "Vanvolt",
 *       "cardno": 0,
 *       "userId": "206"
 *     },
 */
export type TrackedUsers = {
  uid: number;
  role: number;
  password: string;
  name: string;
  cardno: number;
  userId: string;
};

export const activityMdmApiClient = {
  getUsers: () => {
    return authorizedHttpClient.request<Page<TrackedUsers>>({
      url: '/activity-mdm/tracked-users',
      method: 'get'
    });
  }
};
