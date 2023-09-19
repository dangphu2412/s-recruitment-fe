import { createContext } from 'react';
import { noop } from 'src/system/app/internal/utils';
import { ContextWithDispatcher } from 'src/system/domain/clients';
import { User } from '../../../domain/models/user.type';

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
