import { SystemActionTypes, ErrorsState, SET_ERRORS, RESET_ERRORS } from './types';

const initialState: ErrorsState = {
  errors: undefined,
};

export const errorsReducer = (state = initialState, action: SystemActionTypes): ErrorsState => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };

    case RESET_ERRORS:
      return {
        ...state,
        errors: undefined,
      };

    default:
      return state;
  }
};
