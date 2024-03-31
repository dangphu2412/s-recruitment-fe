import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../config/redux.config';
import { SystemStore } from './system-store.types';
import { User } from '../../../entities/user/models/user/user.type';

const systemSlice = createSlice({
  name: 'system',
  initialState: {} as SystemStore,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.userSession = action.payload;
    },
    set(state, action: PayloadAction<{ key: keyof SystemStore; data: any }>) {
      const {
        payload: { key, data }
      } = action;

      state[key] = data;
    }
  }
});

export const { reducer: systemReducer } = systemSlice;

export const systemActions = systemSlice.actions;

export const userSessionSelector = (state: AppState) =>
  state.system.userSession;
