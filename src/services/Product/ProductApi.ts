import { ErrorResponse } from '../types';

import { call } from '../api';
import { GetProductResponse } from './types';

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
}
