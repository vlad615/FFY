import { baseApi } from '@/shared/lib'
import {
  BaseResponseMovieSchema,
  MovieDetailsSchema,
  MovieListResponseSchema,
  type BaseResponseMovie,
  type MovieDetails,
  type MovieListResponse,
} from './movie.types'
import { ZodError } from 'zod'

export const movieApi = baseApi.injectEndpoints({
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
      transformResponse: (response: unknown) => {
        try {
          return MovieDetailsSchema.parse(response)
        } catch (error) {
          if (error instanceof ZodError) {
            console.error('Ошибка валидации MovieDetails:', error.issues)
          }

          throw error
        }
      },
    }),
    getSimilarFilms: build.query<BaseResponseMovie, string>({
      query: (id) => ({
        url: `movie/${id}/similar`,
        method: 'GET',
      }),
      transformResponse: (response: unknown) => {
        try {
          return BaseResponseMovieSchema.parse(response)
        } catch (error) {
          if (error instanceof ZodError) {
            console.error('Ошибка валидации MovieDetails:', error.issues)
          }

          throw error
        }
      },
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
