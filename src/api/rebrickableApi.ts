import axios from 'axios';

export const rebrickableApi = axios.create({
  baseURL: import.meta.env.VITE_REBRICKABLE_API,
  headers: {
    Authorization: `key ${import.meta.env.VITE_REBRICKABLE_API_KEY}`,
  },
});
