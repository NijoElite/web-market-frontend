import { RESPONSE_SUCCESS } from '../types';

export interface CreateOrderResponse {
  status: typeof RESPONSE_SUCCESS;
  data: {
    id: string;
  };
}

export type OrderResponse = CreateOrderResponse;
