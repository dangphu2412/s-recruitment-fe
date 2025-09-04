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

export interface HttpClient {
  request: <T = any>(data: HttpRequest) => Promise<HttpResponse<T>>;
}

export enum HttpStatus {
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  ACCESS_DENIED = 403,
  CONFLICT = 409,
  INTERNAL_SERVER = 500
}
