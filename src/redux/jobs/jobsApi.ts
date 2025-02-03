import api from '../api';

const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchJobs: builder.query({
      query: (userId) => ({
        url: `/jobs/employer/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchJobsQuery } = jobsApi;
