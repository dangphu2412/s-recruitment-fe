import { authorizedHttpClient } from '../../../shared/api';

type UploadRequest = {
  file: File;
};

type UploadResponse = {
  path: string;
};

export const fileApiClient = {
  upload(request: UploadRequest): Promise<UploadResponse> {
    const formData = new FormData();

    formData.append('file', request.file);

    return authorizedHttpClient.request({
      url: '/files/upload',
      method: 'post',
      data: formData
    });
  }
};
