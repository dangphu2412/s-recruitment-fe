import { HttpClientAdapter } from '../adapters/axios-http-client.adapter';
import { AuthorizedHttpClientAdapter } from '../adapters/authorized-http-client.adapter';
import { persistentStorage } from 'src/shared/api/services/persistent.storage';
import { API_URL } from '../../config/constants/env';

const axios = require('axios').create({
  baseURL: API_URL
});

export const httpClient = new HttpClientAdapter(axios);

export const authorizedHttpClient = new AuthorizedHttpClientAdapter(
  httpClient,
  persistentStorage
);
