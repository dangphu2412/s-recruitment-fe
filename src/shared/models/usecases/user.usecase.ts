import { User } from '../../../entities/user/models/user/user.type';

export type UserSession = {
  user?: User;
  sessionStatus: 'authenticated' | 'unauthenticated' | 'verifying';
};

export type UserProfile = {
  username: string;
  name: string;
};

export type UserUsecase = {
  getMyProfile: () => Promise<UserProfile>;
};
