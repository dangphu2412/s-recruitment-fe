import { createContext } from 'react';
import { ContextWithDispatcher } from 'src/shared/models';
import { User } from '../../../models/user/user.type';
import { noop } from '../../../../../shared/models/utils';

export type UserContextState = ContextWithDispatcher<User, User>;

export const initialUserCtxState: User = {
  id: '',
  username: '',
  avatar: '',
  email: '',
  createdAt: '',
  deletedAt: ''
};

export const UserContext = createContext<UserContextState>({
  state: initialUserCtxState,
  dispatch: noop
});
