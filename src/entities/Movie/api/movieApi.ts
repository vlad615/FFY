import { baseApi } from '@/shared/lib'
import type { BaseResponseMovie, MovieDetails, ResponseMovie } from './movie.types'

const movieApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryMovies: build.query<BaseResponseMovie | ResponseMovie, string>({
      query: (category) => `movie/${category}`,
    }),
    getById: build.query<MovieDetails, string>({
      query: (id) => ({
        url: `movie/${id}`,
        method: 'GET',
      }),
    }),
    getSimilarFilms: build.query<BaseResponseMovie, string>({
      query: (id) => ({
        url: `movie/${id}/similar`,
        method: 'GET',
      }),
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

export const { useGetCategoryMoviesQuery, useGetSimilarFilmsQuery, useGetByIdQuery, useSearchMovieQuery } = movieApi
