import { ErrorResponse } from '../types';

import { call } from '../api';
import { CreateUserResponse, GetUserResponse, UpdateUserResponse } from './types';

interface CreateUserParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  secondName: string;
  birthday: string;
}

interface UpdateUserParams {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  secondName: string;
  birthday: string;
  phone: string;
  password?: string;
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

  static async updateUser(params: UpdateUserParams): Promise<UpdateUserResponse | ErrorResponse> {
    return await call<UpdateUserResponse>(UserApi.SERVICE_NAME, 'update', {
      method: 'POST',
      body: JSON.stringify({ ...params, token: localStorage.getItem('token') || '' }),
    });
  }
}
