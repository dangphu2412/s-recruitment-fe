import { GetManyParams, Page } from '@modules/shared/clients/list.api';
import { ApiClient } from '@modules/shared/services';
import {
  CreateUsersDto,
  ExtractNewEmailsDto,
  User,
  UserManagementView
} from '../models/user.type';

export const UserApiClient = {
  getMyProfile(): Promise<User> {
    return ApiClient.get<User, unknown>('/users/me');
  },
  getMany(params: GetManyParams): Promise<Page<UserManagementView>> {
    return ApiClient.get<Page<UserManagementView>, unknown>('/users', {
      params: {
        ...params.filters,
        ...params.pagination
      }
    });
  },
  toggleActive(userId: string): Promise<void> {
    return ApiClient.patch<void, unknown>(`/users/${userId}/active`);
  },
  createUser(createUserDto: CreateUsersDto): Promise<void> {
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
