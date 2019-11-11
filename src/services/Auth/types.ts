import { RESPONSE_SUCCESS } from '../types';

export interface GetTokenResponse {
  status: typeof RESPONSE_SUCCESS;
  data: {
    token: string;
  };
}

export interface CheckTokenResponse {
  status: typeof RESPONSE_SUCCESS;
  data: {
    isValid: boolean;
  };
}

export type AuthResponse = GetTokenResponse | CheckTokenResponse;
