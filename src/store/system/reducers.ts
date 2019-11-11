import { SystemActionTypes, SystemState, AUTHENTICATE } from './types';

const initialState: SystemState = {
  userId: null,
  jwt: null,
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
