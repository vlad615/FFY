import { baseApi } from '@/shared/lib'

const movieApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopularMovies: build.query({
      query: () => `movie/popular`,
    }),
    getNowPlayingMovies: build.query({
      query: () => `movie/now_playing`,
    }),
    getTopRatedMovies: build.query({
      query: () => `movie/top_rated`,
    }),
    getUpcomingMovies: build.query({
      query: () => `movie/upcoming`,
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} = movieApi
