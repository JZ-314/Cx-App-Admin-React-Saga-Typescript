import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from './constants';

export const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
export const fetchUserSuccess = (payload: any) => ({ type: FETCH_USER_SUCCESS, payload });
export const fetchUserFailure = (errors: any) => ({ type: FETCH_USER_FAILURE, errors });

export const createUserRequest = (params: any) => ({ type: CREATE_USER_REQUEST, payload: params });
export const createUserSuccess = (payload: any) => ({ type: CREATE_USER_SUCCESS, payload });
export const createUserFailure = (errors: any) => ({ type: CREATE_USER_FAILURE, errors });

export const updateUserRequest = (userId: string, params: any) => ({
  type: UPDATE_USER_REQUEST,
  payload: params,
  meta: userId,
});
export const updateUserSuccess = (payload: any) => ({ type: UPDATE_USER_SUCCESS, payload });
export const updateUserFailure = (errors: any) => ({ type: UPDATE_USER_FAILURE, errors });

export const deleteUserRequest = (userId: string) => ({ type: DELETE_USER_REQUEST, meta: userId });
export const deleteUserSuccess = (payload: any) => ({ type: DELETE_USER_SUCCESS, payload });
export const deleteUserFailure = (errors: any) => ({ type: DELETE_USER_FAILURE, errors });
