import {
  GetManyParams,
  Page,
  ProbationQuery
} from 'src/shared/models/list.api';
import { authorizedHttpClient } from '../../../shared/api';
import { OperationFee } from 'src/entities/monthly-money/models';
import { Role } from './access-control.client';
import { CommonData } from './user-master-data-api-client';

export type User = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  phoneNumber: string;
  trackingId: string;
  department?: {
    id: string;
    name: string;
  };
  period?: {
    id: string;
    name: string;
  };
  roles: Role[];
  birthday: string;
  isProbation: boolean;
  createdAt: string;
  deletedAt: string;
  operationFee?: OperationFee;
};

export type UserManagementView = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  createdAt: string;
  joinedAt: string;
  deletedAt: string;
  operationFee?: OperationFee;
  roles: Role[];
  department: CommonData;
  remainMonths: number;
  paidMonths: number;
  debtMonths: number;
  isProbation: boolean;
};

export type UserProbationView = {
  id: string;
  email: string;
  probationEndDate: Date;
  createdAt: Date;
};

export type UserRolesView = Pick<Partial<UserManagementView>, 'roles'>;

export type CreateUsersDto = {
  email: string;
  fullName: string;
  departmentId: string;
  periodId: string;
  birthday?: string;
};

export type UpdateUserDto = {
  id: string;
  fullName: string;
  departmentId?: string;
  periodId?: string;
  birthday?: string;
  trackingId?: string;
  phoneNumber?: string;
};

export type UploadUserDto = {
  file: File;
  monthlyConfigId?: number;
};

export type PatchUserRolesPayload = {
  userId: string;
  roleIds: string[];
};

export type UserDetail = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  trackingId: string;
  createdAt: string;
  deletedAt: string;
};

export type UpgradeMemberDto = {
  ids: string[];
  monthlyConfigId: number;
};

type FileCreationResponse = {
  duplicatedEmails?: string[];
}[];

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
  uploadUserByFile(
    uploadUserDto: UploadUserDto
  ): Promise<FileCreationResponse> {
    const formData = new FormData();
    formData.append('file', uploadUserDto.file);

    return authorizedHttpClient.request({
      method: 'post',
      url: '/users/upload',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getProbationUsers(params: ProbationQuery): Promise<Page<UserProbationView>> {
    return authorizedHttpClient.request<Page<UserProbationView>>({
      url: '/users/probation',
      method: 'get',
      params: {
        ...params.filters,
        ...params.pagination
      }
    });
  },
  upgradeMembers(data: UpgradeMemberDto) {
    return authorizedHttpClient.request({
      url: '/users/members',
      method: 'patch',
      data
    });
  },
  updateUser(data: Partial<User>): Promise<void> {
    return authorizedHttpClient.request({
      url: `/users/${data.id}`,
      method: 'patch',
      data
    });
  }
};
