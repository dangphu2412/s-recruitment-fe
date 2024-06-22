import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { userStorage } from 'src/entities/user/models';
import { systemStorage } from 'src/shared/models/store';
import { menuStorage } from '../entities/menu/models';
import { postStorage } from '../entities/posts/models';

const sagaMiddleware = createSagaMiddleware();

const appStoreReducer = combineReducers({
  ...userStorage,
  ...systemStorage,
  ...menuStorage,
  ...postStorage
});

function* sideEffectRegistry() {
  yield all([]);
}

function makeStore() {
  const store = configureStore({
    reducer: appStoreReducer,
    middleware: [sagaMiddleware]
  });

  sagaMiddleware.run(sideEffectRegistry);

  return store;
}

export const store = makeStore();
