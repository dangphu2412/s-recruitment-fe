import { CreateUserType } from 'src/user/domain/constants/admin-management.constants';
import { OperationFee } from 'src/monthly-money/types';
import { Role } from 'src/user/domain/models/rbac.types';

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
