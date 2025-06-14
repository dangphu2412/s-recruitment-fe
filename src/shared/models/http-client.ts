export type HttpRequest = {
  url: string;
  method: 'post' | 'get' | 'put' | 'delete' | 'patch';
  data?: any;
  params?: any;
  headers?: any;
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream';
};

export type HttpResponse<T = any> = T;
export type HttpErrorConstructParams = {
  message: string;
  status: string;
};

export class HttpError extends Error {
  static isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError;
  }

  public status;

  constructor({ message, status }: HttpErrorConstructParams) {
    super(message);
    this.status = status;
  }
}

export interface HttpClient {
  request: <T = any>(data: HttpRequest) => Promise<HttpResponse<T>>;
}
