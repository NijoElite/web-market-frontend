import { RESPONSE_SUCCESS } from '../types';

export interface UploadFileResponse {
  status: typeof RESPONSE_SUCCESS;
  data: {
    path: string;
  };
}

export type UploadResponse = UploadFileResponse;
