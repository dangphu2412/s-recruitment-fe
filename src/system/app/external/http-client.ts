export type HttpRequest = {
  url: string;
  method: 'post' | 'get' | 'put' | 'delete';
  data?: any;
  params?: any;
  headers?: any;
};

export type HttpResponse<T = any> = T;

export class HttpError extends Error {
  static isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError;
  }

  constructor(message: string, public code: string) {
    super(message);
  }
}

export interface HttpClient {
  request: <T = any>(data: HttpRequest) => Promise<HttpResponse<T>>;
}
