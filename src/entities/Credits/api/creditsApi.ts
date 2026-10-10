import { baseApi } from '@/shared/lib'
import { creditsShema, genresShema, type Credits, type Genres } from './credits.type'

const creditsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCredits: build.query<Credits, string>({
      query: (id) => ({
        url: `movie/${id}/credits`,
        method: 'GET',
      }),
      transformResponse: (response: unknown) => creditsShema.parse(response),
    }),
    getGenres: build.query<Genres, void>({
      query: () => 'genre/movie/list',
      transformResponse: (response: unknown) => genresShema.parse(response),
    }),
  }),
})

export const { useGetCreditsQuery, useGetGenresQuery } = creditsApi
