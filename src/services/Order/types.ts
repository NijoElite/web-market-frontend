import { RESPONSE_SUCCESS } from '../types';

export interface OrderItem {
  article: string;
  seller: string;
  qty: number;
  price: number;
  isPaid: boolean;
}

export interface Order {
  customer: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface CreateOrderResponse {
  status: typeof RESPONSE_SUCCESS;
  data: {
    id: string;
  };
}

export interface GetUserOrdersResponse {
  status: typeof RESPONSE_SUCCESS;
  data: Order[];
}

export interface GetCustomerOrdersResponse {
  status: typeof RESPONSE_SUCCESS;
  data: Order[];
}

export interface ChangeStatusResponse {
  status: typeof RESPONSE_SUCCESS;
  data: Order;
}

export type OrderResponse =
  | CreateOrderResponse
  | GetUserOrdersResponse
  | GetCustomerOrdersResponse
  | ChangeStatusResponse;
