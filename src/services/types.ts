import { AuthResponse } from './Auth/types';
import { CreateUserResponse } from './User/types';

export const RESPONSE_SUCCESS = 'success';
export const RESPONSE_ERROR = 'error';

export interface Error {
  name: string;
  message: string;
}

export interface ErrorResponse {
  status: typeof RESPONSE_ERROR;
  errors: Error[];
}

export type ApiResponse = AuthResponse | CreateUserResponse;
