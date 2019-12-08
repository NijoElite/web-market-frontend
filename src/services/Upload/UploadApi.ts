import { ErrorResponse } from '../types';
import { call } from '../api';
import { UploadFileResponse } from './types';

export class UploadApi {
  static readonly SERVICE_NAME = 'upload';

  static async upload(file: File): Promise<UploadFileResponse | ErrorResponse> {
    const formData = new FormData();
    formData.append('filedata', file, file.name);

    return await call<UploadFileResponse>(UploadApi.SERVICE_NAME, '', {
      method: 'POST',
      body: formData,
    });
  }
}
