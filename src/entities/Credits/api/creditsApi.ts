import { baseApi } from '@/shared/lib'
import { creditsShema, type Credits } from './credits.type'

const creditsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCredits: build.query<Credits, string>({
      query: (id) => ({
        url: `movie/${id}/credits`,
        method: 'GET',
      }),
      transformResponse: (response: unknown) => creditsShema.parse(response),
    }),
  }),
})

export const { useGetCreditsQuery } = creditsApi
