import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleErrors } from '../utils/handlerError'

export const baseApi = createApi({
  reducerPath: 'movieApi',
  tagTypes: ['Movies', 'Movie'],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_KEY}`,
      },
    })(args, api, extraOptions)

    if (result.error) {
      handleErrors(result.error)
    }

    return result
  },
  endpoints: () => ({}),
})
