/* eslint-disable no-param-reassign */
import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
  const { '@instagram:token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333/',
  });

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
}
