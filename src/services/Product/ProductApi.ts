import { ErrorResponse } from '../types';

import { call } from '../api';
import {
  GetProductResponse,
  GetLatestResponse,
  CreateProductResponse,
  GetOwnProductsResponse,
  GetStatisticResponse,
  RemoveFromSaleRespnose,
} from './types';

interface GetProductParams {
  article: string;
}

interface GetStatisticParams {
  article: string;
  date: {
    start: Date;
    end: Date;
  };
}

interface CreateProductParams {
  name: string;
  description: string;
  price: number;
  requirements: { option: string; value: string }[];
  publisher: string;
  releaseDate: string;
  genres: string[];
}

export class ProductApi {
  static readonly SERVICE_NAME = 'product';

  static async getProduct(params: GetProductParams): Promise<GetProductResponse | ErrorResponse> {
    return await call<GetProductResponse>(ProductApi.SERVICE_NAME, '', {
      method: 'GET',
      params: [params.article],
    });
  }

  static async getLatest(): Promise<GetLatestResponse | ErrorResponse> {
    return await call<GetLatestResponse>(ProductApi.SERVICE_NAME, 'latest', {
      method: 'GET',
    });
  }

  static async createProduct(product: CreateProductParams): Promise<CreateProductResponse | ErrorResponse> {
    return await call<CreateProductResponse>(ProductApi.SERVICE_NAME, '', {
      method: 'POST',
      body: JSON.stringify({ ...product, token: localStorage.getItem('token') }),
    });
  }

  static async getOwn(): Promise<GetOwnProductsResponse | ErrorResponse> {
    return await call<GetOwnProductsResponse>(ProductApi.SERVICE_NAME, 'own', {
      method: 'GET',
      query: { token: localStorage.getItem('token') || '' },
    });
  }

  static async getStatistic(params: GetStatisticParams): Promise<GetStatisticResponse | ErrorResponse> {
    return await call<GetStatisticResponse>(ProductApi.SERVICE_NAME, 'stats', {
      method: 'GET',
      params: [params.article],
      query: {
        token: localStorage.getItem('token') || '',
        startDate: params.date.start.toISOString(),
        endDate: params.date.end.toISOString(),
      },
    });
  }

  static async removeFromSale(article: string): Promise<RemoveFromSaleRespnose | ErrorResponse> {
    return await call<RemoveFromSaleRespnose>(ProductApi.SERVICE_NAME, 'delete', {
      method: 'POST',
      params: [article],
    });
  }
}
