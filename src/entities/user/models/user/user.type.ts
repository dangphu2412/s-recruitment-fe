import { OperationFee } from 'src/entities/monthly-money/models';
import { Role } from '../rbac/rbac.types';
import { CreateUserType } from '../../config/admin-management.constants';

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
