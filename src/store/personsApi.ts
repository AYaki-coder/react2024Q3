import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Person } from '../types';

export const personsApi = createApi({
  reducerPath: 'personsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (build) => ({
    getPersons: build.query<ApiResponse, { search: string; page: string }>({
      query: ({ search, page }) => `people?search=${search}&page=${page}`,
    }),
    get: build.query<Person, string>({
      query: (id) => `people/${id}`,
    }),
  }),
});

export const { useGetPersonsQuery, useGetQuery } = personsApi;
