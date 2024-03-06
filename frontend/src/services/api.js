import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://cellphones-backend-sooty.vercel.app',
});
