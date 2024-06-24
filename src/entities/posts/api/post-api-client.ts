import { authorizedHttpClient, httpClient } from '../../../shared/api';
import { GetManyParams, Page } from '../../../shared/models';

type Category = {
  id: string;
  name: string;
};

type Author = {
  id: string;
  fullName: string;
};

export type PostManagementView = {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  categories: Category[];
  previewImage: string;
  author: Author;
  createdAt: string;
};

export type CreatePostDto = {
  title: string;
  content: string;
  summary: string;
  previewImage: string;
  categoryCodes: string[];
};

export type EditPostDto = CreatePostDto & {
  id: string;
};

type PostType = 'latest' | 'pin';

export type GetPostParams = GetManyParams & {
  category?: string;
  type?: PostType;
};

export const postApiClient = {
  getMany(params: GetPostParams): Promise<Page<PostManagementView>> {
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
