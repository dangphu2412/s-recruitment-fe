import { CreateUserType } from '@modules/user/constants/admin-management.constants';

export type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  deletedAt: string;
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
