import { GetManyParams, Page } from 'src/system/domain/clients/list.api';
import {
  CreateUsersDto,
  ExtractNewEmailsDto,
  PatchUserRolesPayload,
  User,
  UserManagementView,
  UserRolesView
} from '../models/user.type';
import FormData from 'form-data';
import { CreateUserType } from 'src/user/constants/admin-management.constants';
import { authorizedHttpClient } from '../../system/infrastructure/factories/http-client.factories';

export const UserApiClient = {
  getMyProfile(): Promise<User> {
    return authorizedHttpClient.request({
      url: '/users/me',
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
    if (
      createUserDto.attachment &&
      CreateUserType.EXCEL === createUserDto.createUserType
    ) {
      const attachmentForm = new FormData();

      attachmentForm.append('file', createUserDto.attachment);
      attachmentForm.append('createUserType', createUserDto.createUserType);
      attachmentForm.append('fileType', createUserDto.attachment.type);
      attachmentForm.append('processSheetName', createUserDto.processSheetName);

      return authorizedHttpClient.request({
        method: 'post',
        url: '/users/upload',
        data: attachmentForm,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }

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
