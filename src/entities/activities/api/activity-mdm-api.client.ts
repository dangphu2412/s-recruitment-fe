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
  name: string;
  trackingId: string;
};

export const activityMdmApiClient = {
  getUsers: () => {
    return authorizedHttpClient.request<Page<TrackedUsers>>({
      url: '/device-users',
      method: 'get'
    });
  },
  uploadUsers: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return authorizedHttpClient.request<void>({
      method: 'post',
      url: '/device-users',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
