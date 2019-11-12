export interface SystemState {
  jwt: string | null;
}

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  payload: {
    jwt: string;
  };
}

export type SystemActionTypes = AuthenticateAction;
