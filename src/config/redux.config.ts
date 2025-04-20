import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { systemStorage } from 'src/shared/models/store';
import { postStorage } from '../entities/posts/models';

const sagaMiddleware = createSagaMiddleware();

const appStoreReducer = combineReducers({
  ...systemStorage,
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
