import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../types';

export const personsApi = createApi({
  reducerPath: 'personsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (build) => ({
    getPersons: build.query<ApiResponse, { search: string; page: string }>({
      query: ({ search, page }) => `people?search=${search}&page=${page}`,
    }),
  }),
});

export const { useGetPersonsQuery } = personsApi;
