import { httpClient } from '../../../shared/api';

export type CategoryView = {
  id: string;
  name: string;
};

export const categoryApiClient = {
  getAll(): Promise<CategoryView[]> {
    return httpClient.request({
      url: '/categories',
      method: 'get'
    });
  }
};
