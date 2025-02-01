import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';

const api = createApi({
  reducerPath: 'api',
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 30,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    mode: 'cors',
    prepareHeaders: (headers, {}) => {
      const token = getCookie('client.sid');

      if (token) {
        headers.set('x-access-token', `${token}`);
      }
      return headers;
    },
  }),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
});

export default api;
