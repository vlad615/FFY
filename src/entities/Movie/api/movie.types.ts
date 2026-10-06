import { z } from 'zod'

const MovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.number().array(),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

const BaseResponseMovieSchema = z.object({
  page: z.number(),
  results: MovieSchema.array(),
  total_pages: z.number(),
  total_results: z.number(),
})

const ResponseMovieSchema = BaseResponseMovieSchema.extend({
  dates: z.object({
    maximum: z.string(),
    minimum: z.string(),
  }),
})

export type Movie = z.infer<typeof MovieSchema>
export type BaseResponseMovie = z.infer<typeof BaseResponseMovieSchema>
export type ResponseMovie = z.infer<typeof ResponseMovieSchema>
