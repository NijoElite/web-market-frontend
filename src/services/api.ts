import { ErrorResponse, ApiResponse } from './types';

const API_V = 'v1';
const BASE_URL = 'api';

export interface CallOptions {
  method: 'POST' | 'GET';
  body?: string;
  query?: {
    [key: string]: string | number | boolean;
  };
  params?: string[];
}

export async function call<T extends ApiResponse>(
  service: string,
  method: string,
  options: CallOptions,
): Promise<T | ErrorResponse> {
  let url = `/${BASE_URL}/${API_V}/${service}/${method ? method + '/' : ''}`;

  if (options.params) {
    url += options.params.join('/');
  }

  if (options.query) {
    const pairs = Object.entries(options.query);
    const query = [];
    for (const [key, value] of pairs) {
      query.push(`${key}=${value}`);
    }
    url += '?' + query.join('&');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const j = (await response.json()) as T | ErrorResponse;
  console.log(j);
  return j;
}
