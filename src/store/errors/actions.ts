import * as types from './types';
import { Error } from '../../services/types';

// #region Action Creators
export const resetErrors = (): types.HandleErrorReset => {
  return {
    type: types.RESET_ERRORS,
  };
};

export const setErrors = (errors: Error[]): types.SetErrors => {
  return {
    type: types.SET_ERRORS,
    errors: errors,
  };
};
// #endregion
