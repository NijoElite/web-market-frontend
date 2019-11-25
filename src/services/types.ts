import { AuthResponse } from './Auth/types';
import { UserResponse } from './User/types';
import { ProductResponse } from './Product/types';
import { OrderResponse } from './Order/types';

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

export type ApiResponse = AuthResponse | UserResponse | ProductResponse | OrderResponse;
