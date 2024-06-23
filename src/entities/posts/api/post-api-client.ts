import { authorizedHttpClient, httpClient } from '../../../shared/api';
import { GetManyParams, Page } from '../../../shared/models';

export type PostManagementView = {
  id: string;
  title: string;
  slug: string;
  content: string;
};

export type CreatePostDto = {
  title: string;
  content: string;
};

export type EditPostDto = CreatePostDto & {
  id: string;
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
  },
  getDetail(id: string): Promise<PostManagementView> {
    return httpClient.request({
      url: `/posts/${id}`,
      method: 'get'
    });
  },
  createOne(body: CreatePostDto): Promise<void> {
    return authorizedHttpClient.request({
      url: '/posts',
      method: 'post',
      data: body
    });
  },
  updateOne({ id, ...body }: EditPostDto): Promise<PostManagementView> {
    return authorizedHttpClient.request({
      url: `/posts/${id}`,
      method: 'patch',
      data: body
    });
  }
};
