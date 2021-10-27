import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  FETCH_CURRENT_USER,
  FETCH_ACCESS_TOKEN,
  LOGOUT,
  OPEN_MODAL,
  CLOSE_MODAL,
} from './constants';

export const authenticateRequest = (params: any) => ({
  type: AUTHENTICATE_REQUEST,
  payload: params,
});
export const authenticateSuccess = (payload: any) => ({ type: AUTHENTICATE_SUCCESS, payload });
export const authenticateFailure = (errors: any) => ({ type: AUTHENTICATE_FAILURE, errors });

export const setAuthenticated = () => ({ type: AUTHENTICATE_SUCCESS });

export const fetchCurrentUser = () => ({
  type: FETCH_CURRENT_USER,
  payload: localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser'))
    : null,
});

export const fetchAccessToken = () => ({
  type: FETCH_ACCESS_TOKEN,
  payload: localStorage.getItem('accessToken')
    ? JSON.parse(localStorage.getItem('accessToken'))
    : null,
});

export const logout = () => ({ type: LOGOUT });

export const openModal = (payload: any) => ({ type: OPEN_MODAL, payload });
export const closeModal = () => ({ type: CLOSE_MODAL });
