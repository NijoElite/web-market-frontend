import { RESPONSE_SUCCESS } from '../types';

export interface Product {
  article: string;
  owner: string;
  name: string;
  ownerId: string;
  description: string;
  price: number;
  requirements?: {
    option: string;
    value: string;
  }[];
  publisher: string;
  releaseDate: string;
  sliderImage: string;
  defaultImage: string;
  isOnSale: string;
  genres: string[];
}

export interface GetProductResponse {
  status: typeof RESPONSE_SUCCESS;
  data: Product;
}

export interface GetLatestResponse {
  status: typeof RESPONSE_SUCCESS;
  data: Product[];
}

export interface CreateProductResponse {
  status: typeof RESPONSE_SUCCESS;
  data: {
    productId: string;
  };
}

export interface GetOwnProductsResponse {
  status: typeof RESPONSE_SUCCESS;
  data: Product[];
}

export interface GetStatisticResponse {
  status: typeof RESPONSE_SUCCESS;
  data: {
    totalQty: number;
    totalCost: number;
    paidQty: number;
    paidCost: number;
  };
}

export interface RemoveFromSaleRespnose {
  status: typeof RESPONSE_SUCCESS;
  data: Product;
}

export interface UpdateProductResponse {
  status: typeof RESPONSE_SUCCESS;
  data: Product;
}

export type ProductResponse =
  | GetProductResponse
  | GetLatestResponse
  | CreateProductResponse
  | GetOwnProductsResponse
  | GetStatisticResponse
  | RemoveFromSaleRespnose;
