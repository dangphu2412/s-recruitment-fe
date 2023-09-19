import { GetManyParams, Page } from 'src/system/domain/clients/list.api';
import {
  CreateUsersDto,
  ExtractNewEmailsDto,
  PatchUserRolesPayload,
  User,
  UserDetail,
  UserManagementView,
  UserRolesView
} from '../../domain/models/user.type';
import { authorizedHttpClient } from '../../../system/infrastructure/factories/http-client.factories';

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
