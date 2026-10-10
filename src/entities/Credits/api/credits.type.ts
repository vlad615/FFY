import { z } from 'zod'

export const genreShema = z.object({
  id: z.number(),
  name: z.string(),
})

export const genresShema = z.object({
  genres: genreShema.array(),
})

export const creditShema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
})

export const crewShema = z.object({
  adult: z.boolean(),
  department: z.string(),
  gender: z.number(),
  id: z.number(),
  job: z.string(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  credit_id: z.string(),
})

export const creditsShema = z.object({
  id: z.number(),
  cast: creditShema.array(),
  crew: crewShema.array(),
})

export type Credit = z.infer<typeof creditShema>
export type Crew = z.infer<typeof crewShema>
export type Credits = z.infer<typeof creditsShema>
export type Genre = z.infer<typeof genreShema>
export type Genres = z.infer<typeof genresShema>