import {
  SystemActionTypes,
  SystemState,
  FETCH_TOKEN_BEGIN,
  FETCH_TOKEN_FAILURE,
  FETCH_TOKEN_SUCCESS,
  LOGOUT,
} from './types';
import jwt from 'jsonwebtoken';

const token = localStorage.getItem('token') || '';
const decoded = jwt.decode(token) as { id: string };
const userId = decoded ? decoded.id : undefined;

const initialState: SystemState = {
  isFetching: false,
  userId: userId,
  jwt: token || undefined,
};

export const systemReducer = (state = initialState, action: SystemActionTypes): SystemState => {
  switch (action.type) {
    case FETCH_TOKEN_BEGIN:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_TOKEN_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    case FETCH_TOKEN_SUCCESS:
      const decoded = jwt.decode(action.jwt) as any;

      return {
        ...state,
        jwt: action.jwt,
        userId: decoded.id || undefined,
        isFetching: false,
      };

    case LOGOUT:
      return {
        ...state,
        jwt: undefined,
        userId: undefined,
      };

    default:
      return state;
  }
};
