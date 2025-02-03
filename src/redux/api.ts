import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';

const api = createApi({
  reducerPath: 'api',
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 30,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    mode: 'cors', //  Explicitly allow CORS
    credentials: 'include', //  Ensure cookies and auth headers are sent
    prepareHeaders: async (headers) => {
      const token = await getCookie('client.sid'); // Ensure this is working
      if (token) {
        headers.set('x-access-token', token as string);
      }
      headers.set('Content-Type', 'application/json'); // Explicitly set content type
      return headers;
    },
  }),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
});

export default api;
