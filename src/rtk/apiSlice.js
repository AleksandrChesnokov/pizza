import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://64d7403e2a017531bc131223.mockapi.io",
  }),

  endpoints: (builder) => ({
    getPizzas: builder.query({
      query: () => "/items",
    }),
    getSort: builder.query({
      query: (num) => `/items?category=${num}`,
    }),
  }),
});

export const { useGetPizzasQuery, useGetSortQuery } = apiSlice;
