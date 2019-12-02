import { ErrorResponse } from '../types';

import { call } from '../api';
import { GetProductResponse, GetLatestResponse, Product, CreateProductResponse } from './types';

interface GetProductParams {
  article: string;
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
}
