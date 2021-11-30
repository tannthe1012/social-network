import axios from 'axios';
import { Router } from "../Router";

import { setToken as setTokenStorage, getToken as getTokenStorage } from './storage';

export const api = axios.create({
  baseURL: 'https://bk-n.herokuapp.com/',
  timeout: 30000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

const set = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

api.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 403) {
    Router.open('/sign-in');
  }
  return Promise.reject(error);
});


export function setToken(token) {
  setTokenStorage(token);
  set(token);
}

set(getTokenStorage());

window.api = api;
window.setToken = setToken;