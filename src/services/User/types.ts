import { RESPONSE_SUCCESS } from '../types';

export interface CreateUserResponse {
  status: typeof RESPONSE_SUCCESS;
  data: {
    _id: string;
  };
}

export type UserResponse = CreateUserResponse;
