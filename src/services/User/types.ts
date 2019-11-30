import { RESPONSE_SUCCESS } from '../types';

export interface CreateUserResponse {
  status: typeof RESPONSE_SUCCESS;
  data: {
    _id: string;
  };
}

export interface GetUserResponse {
  status: typeof RESPONSE_SUCCESS;
  data: {
    user: {
      _id: string;
      firstName: string;
      secondName: string;
      lastName: string;
      phone: string;
      role: string[];
      email?: string;
      birthday?: string;
    };
  };
}

export type UserResponse = CreateUserResponse | GetUserResponse;
