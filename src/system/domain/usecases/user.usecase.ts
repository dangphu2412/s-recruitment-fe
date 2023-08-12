import { User } from '../../../user/models/user.type';

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
