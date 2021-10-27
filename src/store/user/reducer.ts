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

import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} from './actions';

type Action =
  | ReturnType<typeof fetchUserRequest>
  | ReturnType<typeof fetchUserSuccess>
  | ReturnType<typeof fetchUserFailure>
  | ReturnType<typeof createUserRequest>
  | ReturnType<typeof createUserSuccess>
  | ReturnType<typeof createUserFailure>
  | ReturnType<typeof updateUserRequest>
  | ReturnType<typeof updateUserSuccess>
  | ReturnType<typeof updateUserFailure>
  | ReturnType<typeof deleteUserRequest>
  | ReturnType<typeof deleteUserSuccess>
  | ReturnType<typeof deleteUserFailure>;

type InitialStateType = {
  userList: any;
  data: any;
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = { userList: null, data: null, loading: false, errors: [] };

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, userList: action.payload, errors: [] };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case CREATE_USER_REQUEST:
      return { ...state, loading: true };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload, errors: [] };
    case CREATE_USER_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false };
    case DELETE_USER_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
