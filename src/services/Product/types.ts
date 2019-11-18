import { RESPONSE_SUCCESS } from '../types';

export interface GetProductResponse {
  status: typeof RESPONSE_SUCCESS;
  data: {
    article: string;
    owner: string;
    name: string;
    description: string;
    price: number;
    requirements: {
      option: string;
      value: string;
    }[];
    publisher: string;
    releaseDate: string;
    sliderImage: string;
    defaultImage: string;
    rating: number;
    genres: string[];
  };
}

export type ProductResponse = GetProductResponse;
