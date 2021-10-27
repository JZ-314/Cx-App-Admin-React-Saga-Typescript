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

import {
  authenticateRequest,
  authenticateSuccess,
  authenticateFailure,
  fetchCurrentUser,
  fetchAccessToken,
  logout,
  openModal,
  closeModal,
} from './actions';

type Action =
  | ReturnType<typeof authenticateRequest>
  | ReturnType<typeof authenticateSuccess>
  | ReturnType<typeof authenticateFailure>
  | ReturnType<typeof fetchCurrentUser>
  | ReturnType<typeof fetchAccessToken>
  | ReturnType<typeof logout>
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>;

type InitialStateType = {
  authenticated: boolean;
  currentUser: any;
  userToken: any;
  modalOpen: boolean;
  currentModal: string;
  modalParams: any;
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = {
  authenticated: false,
  currentUser: null,
  userToken: null,
  modalOpen: false,
  currentModal: '',
  modalParams: null,
  loading: false,
  errors: null,
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case AUTHENTICATE_REQUEST:
      return { ...state, loading: true };
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload?.user,
        authenticated: true,
        errors: [],
      };
    case AUTHENTICATE_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_CURRENT_USER:
      return { ...state, loading: false, currentUser: action.payload, errors: [] };
    case FETCH_ACCESS_TOKEN:
      return { ...state, loading: false, userToken: action.payload, errors: [] };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        authenticated: false,
        currentUser: null,
        userToken: null,
        errors: [],
      };
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
        currentModal: action.payload.modal,
        modalParams: action.payload.params,
      };
    case CLOSE_MODAL:
      return { ...state, modalOpen: false, currentModal: '', modalParams: null };
    default:
      return state;
  }
};

export default reducer;
