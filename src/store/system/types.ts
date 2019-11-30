// #region System State
export interface SystemState {
  isFetching: boolean;
  userId?: string;
  jwt?: string;
}
// #endregion

// #region Constants
export const FETCH_TOKEN_BEGIN = 'FETCH_TOKEN_BEGIN';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';

export const LOGOUT = 'LOGOUT';
// #endregion

// #region Actions
export interface FetchTokenBegin {
  type: typeof FETCH_TOKEN_BEGIN;
}

export interface FetchTokenSuccess {
  type: typeof FETCH_TOKEN_SUCCESS;
  jwt: string;
}

export interface FetchTokenFailure {
  type: typeof FETCH_TOKEN_FAILURE;
}

export interface Logout {
  type: typeof LOGOUT;
}
// #endregion

export type SystemActionTypes = FetchTokenBegin | FetchTokenFailure | FetchTokenSuccess | Logout;
