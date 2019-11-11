export interface SystemState {
  userId: string | null;
  jwt: string | null;
}

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  payload: {
    userId: string;
    jwt: string;
  };
}

export type SystemActionTypes = AuthenticateAction;
