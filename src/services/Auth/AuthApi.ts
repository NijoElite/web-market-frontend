import { ErrorResponse } from '../types';
import { call } from '../api';
import { GetTokenResponse, CheckTokenResponse } from './types';

export class AuthApi {
  static readonly SERVICE_NAME = 'auth';

  static async getToken(email: string, password: string): Promise<GetTokenResponse | ErrorResponse> {
    return await call<GetTokenResponse>(AuthApi.SERVICE_NAME, 'getToken', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  static async checkToken(token: string): Promise<CheckTokenResponse | ErrorResponse> {
    return await call<CheckTokenResponse>(AuthApi.SERVICE_NAME, 'checkToken', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }
}
