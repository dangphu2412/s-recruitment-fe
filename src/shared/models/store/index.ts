import { Reducer, ReducersMapObject } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

export type AppStorage<K extends string, D> = {
  [k in K]: D;
};

export function createStoreModel(
  modelName: string,
  model: Reducer
): ReducersMapObject {
  return {
    [modelName]: model
  };
}

export type SystemDomain = {};

const systemSlice = createSlice({
  name: 'system',
  initialState: {} as SystemDomain,
  reducers: {}
});

export const systemStorage = createStoreModel('system', systemSlice.reducer);

export const systemActions = systemSlice.actions;
