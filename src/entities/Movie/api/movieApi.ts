import { baseApi } from '@/shared/lib'
import {
  BaseResponseMovieSchema,
  MovieDetailsSchema,
  MovieListResponseSchema,
  type BaseResponseMovie,
  type MovieDetails,
  type MovieListResponse,
} from './movie.types'

const movieApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryMovies: build.query<MovieListResponse, string>({
      query: (category) => `movie/${category}`,
      transformResponse: (response: unknown) => MovieListResponseSchema.parse(response),
    }),
    getById: build.query<MovieDetails, string>({
      query: (id) => ({
        url: `movie/${id}`,
        method: 'GET',
      }),
      transformResponse: (response) => MovieDetailsSchema.parse(response),
    }),
    getSimilarFilms: build.query<BaseResponseMovie, string>({
      query: (id) => ({
        url: `movie/${id}/similar`,
        method: 'GET',
      }),
      transformResponse: (response) => BaseResponseMovieSchema.parse(response),
    }),
    searchMovie: build.query<BaseResponseMovie, string>({
      query: (query) => ({
        url: 'search/movie',
        method: 'GET',
        params: { query },
      }),
      transformResponse: (response) => BaseResponseMovieSchema.parse(response),
    }),
  }),
})

export const { useGetCategoryMoviesQuery, useGetSimilarFilmsQuery, useGetByIdQuery, useSearchMovieQuery } = movieApi
