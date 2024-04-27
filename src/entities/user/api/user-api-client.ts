import { GetManyParams, Page } from 'src/shared/models/list.api';
import { authorizedHttpClient } from '../../../shared/api';
import { OperationFee } from 'src/entities/monthly-money/models';
import { CreateUserType } from '../config';
import { Role } from './access-control.client';

export type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  deletedAt: string;
  operationFee?: OperationFee;
};

export type UserManagementView = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  deletedAt: string;
  operationFee?: OperationFee;
  roles: Role[];
};

export type UserRolesView = Pick<Partial<UserManagementView>, 'roles'>;

export type CreateUsersDto = {
  email: string;
  fullName: string;
  birthday?: string;
  createUserType: CreateUserType;
  monthlyConfigId?: string;
  attachment?: File;
  processSheetName?: string;
};

export type PatchUserRolesPayload = {
  userId: string;
  roleIds: string[];
};

export type ExtractNewEmailsDto = {
  value: string[];
};

export type UserDetail = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  deletedAt: string;
};

export const userApiClient = {
  getMyProfile(): Promise<UserDetail> {
    return authorizedHttpClient.request({
      url: '/users/me',
      method: 'get'
    });
  },
  getUserDetail(id: string): Promise<User> {
    return authorizedHttpClient.request({
      url: `/users/${id}`,
      method: 'get'
    });
  },
  getMany(params: GetManyParams): Promise<Page<UserManagementView>> {
    return authorizedHttpClient.request<Page<UserManagementView>>({
      url: '/users',
      method: 'get',
      params: {
        ...params.filters,
        ...params.pagination
      }
    });
  },
  getUserRoles(userId: string): Promise<UserRolesView> {
    return authorizedHttpClient.request<UserRolesView>({
      url: `/users/${userId}/roles`,
      method: 'get'
    });
  },
  async updateUserRoles({
    userId,
    roleIds
  }: PatchUserRolesPayload): Promise<void> {
    await authorizedHttpClient.request({
      url: `/users/${userId}/roles`,
      method: 'patch',
      data: {
        userId,
        roleIds
      }
    });
  },
  async toggleActive(userId: string): Promise<void> {
    await authorizedHttpClient.request({
      url: `/users/${userId}/active`,
      method: 'patch'
    });
  },
  createUser(createUserDto: CreateUsersDto): Promise<void> {
    return authorizedHttpClient.request({
      method: 'post',
      url: '/users',
      data: createUserDto
    });
  },
  extractNewEmails(
    extractNewEmailsDto: ExtractNewEmailsDto
  ): Promise<string[]> {
    return authorizedHttpClient.request<string[]>({
      method: 'get',
      params: { value: extractNewEmailsDto.value.join(',') },
      url: '/users/extract-new-values'
    });
  }
};
