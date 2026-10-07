import { baseApi } from '@/shared/lib'
import type { BaseResponseMovie, ResponseMovie } from './movie.types'

const movieApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryMovies: build.query<BaseResponseMovie | ResponseMovie, string>({
      query: (category) => `movie/${category}`,
    }),
    searchMovie: build.query<BaseResponseMovie, string>({
      query: (query) => ({
        url: 'search/movie',
        method: 'GET',
        params: { query },
      }),
    }),
  }),
})

export const { useGetCategoryMoviesQuery, useSearchMovieQuery } = movieApi
