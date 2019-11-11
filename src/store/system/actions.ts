import * as types from './types';

export const authenticate = (userId: string, jwt: string): types.AuthenticateAction => {
  return {
    type: types.AUTHENTICATE,
    payload: {
      userId: userId,
      jwt: jwt,
    },
  };
};
