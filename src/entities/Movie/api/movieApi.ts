import { baseApi } from '@/shared/lib'
import type { BaseResponseMovie, ResponseMovie } from './movie.types'
import { url } from 'zod'

const movieApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopularMovies: build.query<BaseResponseMovie, void>({
      query: () => `movie/popular`,
    }),
    getNowPlayingMovies: build.query<ResponseMovie, void>({
      query: () => `movie/now_playing`,
    }),
    getTopRatedMovies: build.query<BaseResponseMovie, void>({
      query: () => `movie/top_rated`,
    }),
    getUpcomingMovies: build.query<ResponseMovie, void>({
      query: () => `movie/upcoming`,
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

export const {
  useGetPopularMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useSearchMovieQuery,
} = movieApi
