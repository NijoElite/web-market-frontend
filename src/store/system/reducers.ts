import { SystemActionTypes, SystemState, AUTHENTICATE } from './types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState: SystemState = {
  userId: null,
  jwt: cookies.get('token') || null,
};

export const systemReducer = (state = initialState, action: SystemActionTypes): SystemState => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        userId: action.payload.userId,
        jwt: action.payload.jwt,
      };

    default:
      return state;
  }
};
