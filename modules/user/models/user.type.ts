import { CreateUserType } from '@modules/user/constants/admin-management.constants';
import { OperationFee } from '@modules/monthly-money/types';

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
};

export type CreateUsersDto = {
  emails: string[];
  createUserType: CreateUserType;
  monthlyConfigId?: string;
  isSilentCreate: boolean;
};

export type ExtractNewEmailsDto = {
  value: string[];
};
