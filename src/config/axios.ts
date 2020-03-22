import axios from 'axios';

const appID = 'gxd4HcnaxxFM64hcN4nJmawQ';
const appSecret = 'uYmMu1oVickC7zdox6L7TLJ3';

/* tslint:disable:no-string-literal */
const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  // timeout:1000,
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
  const xToken = localStorage.getItem('x-token');
  if (xToken) {
    // 认证信息
    config.headers['Authorization'] = `Bearer ${xToken}`;
  }
  return config;
}, (error) => {
  console.error(error);
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
  // Do something with response data
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token']);
  }
  return response;
}, (error) => {
  if (error.response.status === 401) {
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

/* tslint:disable:no-string-literal */
export default instance;