import { Error } from '../../services/types';

// System State
export interface ErrorsState {
  errors?: Error[];
}
// #endregion

// #region Action Types
export const RESET_ERRORS = 'RESET_ERRORS';
export const SET_ERRORS = 'SET_ERRORS';
// #endregion

// #region Actions
export interface HandleErrorReset {
  type: typeof RESET_ERRORS;
}

export interface SetErrors {
  type: typeof SET_ERRORS;
  errors: Error[];
}
// #endregion

export type SystemActionTypes = SetErrors | HandleErrorReset;
