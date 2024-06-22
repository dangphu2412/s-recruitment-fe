import { authorizedHttpClient } from '../../../shared/api';
import { GetManyParams, Page } from '../../../shared/models';

export type PostManagementView = {
  id: string;
  title: string;
  slug: string;
  content: string;
};

export const postApiClient = {
  getMany(params: GetManyParams): Promise<Page<PostManagementView>> {
    return authorizedHttpClient.request({
      url: '/posts',
      method: 'get',
      params: {
        ...params.filters,
        ...params.pagination
      }
    });
  }
};
