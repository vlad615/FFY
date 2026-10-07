import { baseApi } from '@/shared/lib'
import type { Credits } from './credits.type'

const creditsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCredits: build.query<Credits, string>({
      query: (id) => ({
        url: `movie/${id}/credits`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useGetCreditsQuery } = creditsApi
