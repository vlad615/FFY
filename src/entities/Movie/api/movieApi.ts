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
    getCategoryMovies: build.query<MovieListResponse, { category: string; page: number }>({
      query: ({ category, page }) => ({ url: `movie/${category}`, params: { page: page } }),
      transformResponse: (response: unknown) => MovieListResponseSchema.parse(response),
    }),
    getCategoryInfMovies: build.infiniteQuery<MovieListResponse, { category: string }, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined),
      },
      query: ({ queryArg, pageParam }) => ({
        url: `movie/${queryArg.category}`,
        params: { page: pageParam },
      }),
      transformResponse: (response: unknown) => MovieListResponseSchema.parse(response),
    }),
    getById: build.query<MovieDetails, string>({
      query: (id) => `movie/${id}`,
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
      query: (id) => `movie/${id}/similar`,
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
    searchMovie: build.infiniteQuery<BaseResponseMovie, { query: string }, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined),
      },
      query: ({ queryArg, pageParam }) => ({
        url: 'search/movie',
        method: 'GET',
        params: { query: queryArg.query, page: pageParam },
      }),
      transformResponse: (response) => BaseResponseMovieSchema.parse(response),
    }),
  }),
})

export const {
  useGetCategoryMoviesQuery,
  useGetSimilarFilmsQuery,
  useGetCategoryInfMoviesInfiniteQuery,
  useGetByIdQuery,
  useSearchMovieInfiniteQuery,
} = movieApi
