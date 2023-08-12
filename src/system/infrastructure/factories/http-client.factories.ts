import { HttpClientAdapter } from '../adapters/axios-http-client.adapter';
import { AuthorizedHttpClientAdapter } from '../adapters/authorized-http-client.adapter';
import { persistentStorage } from '../../app/internal/services/persistent.storage';

const axios = require('axios').create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:8080'
});

export const httpClient = new HttpClientAdapter(axios);

export const authorizedHttpClient = new AuthorizedHttpClientAdapter(
  httpClient,
  persistentStorage
);
