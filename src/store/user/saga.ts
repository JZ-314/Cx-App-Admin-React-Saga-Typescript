import {
  FETCH_USER_REQUEST,
  CREATE_USER_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
} from './constants';
import * as actions from './actions';
import * as API from '../../apis/user';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchUserRequestSaga() {
  try {
    const response = yield call(API.fetchUser, null);
    yield put(actions.fetchUserSuccess(response));
  } catch (e) {
    yield put(actions.fetchUserFailure(e));
  }
}

function* createUserRequestSaga(action: any) {
  const param = action.payload;
  try {
    const response = yield call(API.createUser, param);
    yield put(actions.createUserSuccess(response));
  } catch (e) {
    yield put(actions.createUserFailure(e));
  }
}
function* updateUserRequestSaga(action: any) {
  const param = action.payload;
  const id = action.meta;
  try {
    const response = yield call(API.updateUser, id, param);
    yield put(actions.updateUserSuccess(response.data));
  } catch (e) {
    yield put(actions.updateUserFailure(e));
  }
}
function* deleteUserRequestSaga(action: any) {
  const id = action.meta;
  try {
    const response = yield call(API.deleteUser, id);
    yield put(actions.deleteUserSuccess(response));
  } catch (e) {
    yield put(actions.deleteUserFailure(e));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserRequestSaga);
  yield takeEvery(CREATE_USER_REQUEST, createUserRequestSaga);
  yield takeEvery(UPDATE_USER_REQUEST, updateUserRequestSaga);
  yield takeEvery(DELETE_USER_REQUEST, deleteUserRequestSaga);
}
