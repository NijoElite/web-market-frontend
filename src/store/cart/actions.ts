import * as constants from '../Constants';

// #region action interfaces
export interface Authenticate {
  type: constants.AUTHENTICATE;
  payload: {
    userId: string;
  };
}
// #endregion

// #region actions
export const Authenticate = (userId: string): Authenticate => {
  return {
    type: constants.AUTHENTICATE,
    payload: {
      userId: userId,
    },
  };
};
// #endregion
