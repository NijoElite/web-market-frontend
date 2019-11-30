import { ErrorResponse } from '../types';

import { call } from '../api';
import { CreateUserResponse, GetUserResponse } from './types';

interface CreateUserParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  secondName: string;
  birthday: string;
}

export class UserApi {
  static readonly SERVICE_NAME = 'user';

  static async createUser(params: CreateUserParams): Promise<CreateUserResponse | ErrorResponse> {
    return await call<CreateUserResponse>(UserApi.SERVICE_NAME, '', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  static async getUser(userId: string): Promise<GetUserResponse | ErrorResponse> {
    return await call<GetUserResponse>(UserApi.SERVICE_NAME, '', {
      method: 'GET',
      query: { id: userId, token: localStorage.getItem('token') || '' },
    });
  }
}
