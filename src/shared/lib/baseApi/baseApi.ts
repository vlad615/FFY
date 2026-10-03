import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'movieApi',
  tagTypes: ['Movies', 'Movie'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_KEY}`,
    },
  }),
  endpoints: () => ({}),
})
