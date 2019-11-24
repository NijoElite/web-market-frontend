import { ErrorResponse } from '../types';

import { call } from '../api';
import { GetProductResponse, GetLatestResponse } from './types';

interface GetProductParams {
  article: string;
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
}
