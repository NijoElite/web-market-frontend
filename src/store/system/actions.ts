import * as types from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AuthApi } from '../../services/Auth/AuthApi';
import { setError } from '../errors/actions';

// #region Action Creators
export const fetchBegin = (): types.FetchTokenBegin => {
  return {
    type: types.FETCH_TOKEN_BEGIN,
  };
};

export const fetchSuccess = (jwt: string): types.FetchTokenSuccess => {
  return {
    type: types.FETCH_TOKEN_SUCCESS,
    jwt: jwt,
  };
};

export const fetchFailure = (): types.FetchTokenFailure => {
  return {
    type: types.FETCH_TOKEN_FAILURE,
  };
};

export const logout = (): types.Logout => {
  localStorage.setItem('token', '');
  return {
    type: types.LOGOUT,
  };
};
// #endregion

// #region Thunks
export const login = (email: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(fetchBegin());

    const apiResponse = await AuthApi.getToken(email, password);

    if (apiResponse.status === 'success') {
      const token = apiResponse.data.token;
      localStorage.setItem('token', token);
      dispatch(fetchSuccess(token));
    } else {
      const errors = apiResponse.errors;
      dispatch(fetchFailure());
      dispatch(setError(errors));
    }
  };
};
// #endregion
