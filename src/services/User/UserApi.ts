import { ErrorResponse } from '../types';

import { call } from '../api';
import { CreateUserResponse } from './types';

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
}
