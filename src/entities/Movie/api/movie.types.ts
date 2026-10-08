import { z } from 'zod'

const MovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
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

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

const InfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
})

const ProductionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
})

const ProductionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
})

const SpokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
})

export const MovieDetailsSchema = MovieSchema.omit({ genre_ids: true }).extend({
  belongs_to_collection: InfoSchema.nullable(),
  budget: z.number(),
  genres: GenreSchema.array(),
  homepage: z.string().nullable(),
  imdb_id: z.string().nullable(),
  origin_country: z.string().array(),
  production_companies: ProductionCompanySchema.array(),
  production_countries: ProductionCountrySchema.array(),
  revenue: z.number(),
  runtime: z.number().nullable(),
  spoken_languages: SpokenLanguageSchema.array(),
  status: z.string(),
  tagline: z.string().nullable(),
})

export const BaseResponseMovieSchema = z.object({
  page: z.number(),
  results: MovieSchema.array(),
  total_pages: z.number(),
  total_results: z.number(),
})

export const ResponseMovieSchema = BaseResponseMovieSchema.extend({
  dates: z.object({
    maximum: z.string(),
    minimum: z.string(),
  }),
})

export const MovieListResponseSchema = z.union([ResponseMovieSchema, BaseResponseMovieSchema])

export type MovieListResponse = z.infer<typeof MovieListResponseSchema>

export type Movie = z.infer<typeof MovieSchema>
export type MovieDetails = z.infer<typeof MovieDetailsSchema>
export type BaseResponseMovie = z.infer<typeof BaseResponseMovieSchema>
