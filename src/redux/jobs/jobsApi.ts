import api from '../api';

const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchJobs: builder.query({
      query: (id) => ({
        url: `/jobs/employer/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchJobsQuery } = jobsApi;
