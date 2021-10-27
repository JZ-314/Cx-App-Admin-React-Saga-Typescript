import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import app from './app/reducer';
import user from './user/reducer';

import appSaga from './app/saga';
import userSaga from './user/saga';

const rootReducer = combineReducers({
  app,
  user,
});

export function* rootSaga() {
  yield all([appSaga(), userSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
