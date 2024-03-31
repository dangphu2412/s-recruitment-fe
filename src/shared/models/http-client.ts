export type HttpRequest = {
  url: string;
  method: 'post' | 'get' | 'put' | 'delete' | 'patch';
  data?: any;
  params?: any;
  headers?: any;
};

export type HttpResponse<T = any> = T;
export type HttpErrorConstructParams = {
  message: string;
  status: string;
  code: string;
};
export interface ClientError extends Error {
  errorCode: string;
}
export class HttpError extends Error {
  static isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError;
  }

  public status;
  public code;

  constructor({ message, status, code }: HttpErrorConstructParams) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export interface HttpClient {
  request: <T = any>(data: HttpRequest) => Promise<HttpResponse<T>>;
}
