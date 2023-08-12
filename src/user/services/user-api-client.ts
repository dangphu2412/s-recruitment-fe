import { GetManyParams, Page } from 'src/system/domain/clients/list.api';
import { ApiClient } from 'src/system/app/internal/services';
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
    return ApiClient.get<Page<UserManagementView>, unknown>('/users', {
      params: {
        ...params.filters,
        ...params.pagination
      }
    });
  },
  getUserRoles(userId: string): Promise<UserRolesView> {
    return ApiClient.get<UserRolesView, unknown>(`/users/${userId}/roles`);
  },
  updateUserRoles({ userId, roleIds }: PatchUserRolesPayload): Promise<void> {
    return ApiClient.patch<void, PatchUserRolesPayload>(
      `/users/${userId}/roles`,
      {
        userId,
        roleIds
      }
    );
  },
  toggleActive(userId: string): Promise<void> {
    return ApiClient.patch<void, unknown>(`/users/${userId}/active`);
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

      return ApiClient.post<void, FormData>('/users/upload', attachmentForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }

    return ApiClient.post<void, CreateUsersDto>('/users', createUserDto);
  },
  extractNewEmails(
    extractNewEmailsDto: ExtractNewEmailsDto
  ): Promise<string[]> {
    return ApiClient.get<string[], ExtractNewEmailsDto>(
      '/users/extract-new-values',
      {
        params: { value: extractNewEmailsDto.value.join(',') }
      }
    );
  }
};