import { ErrorResponse } from '../types';
import { call } from '../api';
import { CreateOrderResponse, GetUserOrdersResponse, GetCustomerOrdersResponse } from './types';
import { CartItem } from '../../store/cart/types';

export class OrderApi {
  static readonly SERVICE_NAME = 'order';

  static async createOrder(items: CartItem[]): Promise<CreateOrderResponse | ErrorResponse> {
    return await call<CreateOrderResponse>(OrderApi.SERVICE_NAME, '', {
      method: 'POST',
      body: JSON.stringify({ items: items, token: localStorage.getItem('token') }),
    });
  }

  static async getUserOrders(): Promise<GetUserOrdersResponse | ErrorResponse> {
    return await call<GetUserOrdersResponse>(OrderApi.SERVICE_NAME, 'user', {
      method: 'GET',
      query: { token: localStorage.getItem('token') || '' },
    });
  }

  static async getCustomerOrder(): Promise<GetCustomerOrdersResponse | ErrorResponse> {
    return await call<GetCustomerOrdersResponse>(OrderApi.SERVICE_NAME, 'customer', {
      method: 'GET',
      query: { token: localStorage.getItem('token') || '' },
    });
  }
}
