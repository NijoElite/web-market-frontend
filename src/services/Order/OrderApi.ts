import { ErrorResponse } from '../types';
import { call } from '../api';
import { CreateOrderResponse } from './types';
import { CartItem } from '../../store/cart/types';

export class OrderApi {
  static readonly SERVICE_NAME = 'order';

  static async createOrder(items: CartItem[]): Promise<CreateOrderResponse | ErrorResponse> {
    return await call<CreateOrderResponse>(OrderApi.SERVICE_NAME, '', {
      method: 'POST',
      body: JSON.stringify({ items: items, token: localStorage.getItem('token') }),
    });
  }
}
