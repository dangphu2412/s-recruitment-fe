import { authorizedHttpClient } from '../../../shared/api';
import { Page, Pagination } from '../../../shared/models';
import { User } from './user-api-client';
import { AggregateRoot } from '../../../shared/models/aggregate-model';

type UserGroup = {
  id: string;
  name: string;
  description: string;
  users: User[];
};
type UserGroupQuery = Pagination;
type CreateUserGroup = {
  name: string;
  description: string;
  userIds: string[];
};

export const userGroupApiClient = {
  getUserGroups: async (params: UserGroupQuery) => {
    return authorizedHttpClient.request<Page<UserGroup>>({
      method: 'get',
      url: '/user-groups',
      params
    });
  },
  createUserGroup: async (data: CreateUserGroup) => {
    return authorizedHttpClient.request({
      method: 'post',
      url: '/user-groups',
      data
    });
  },
  deleteUserGroup: async ({ id }: AggregateRoot) => {
    return authorizedHttpClient.request({
      method: 'delete',
      url: `/user-groups/${id}`
    });
  }
};
