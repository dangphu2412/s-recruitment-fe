export type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  deletedAt: string;
};

export type CreateUserDto = {
  email: string;
};

export type ExtractNewEmailsDto = {
  value: string[];
};
