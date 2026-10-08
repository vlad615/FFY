import type { MovieDetails } from '../api/movie.types'

export const getGenres = (movie: MovieDetails) => {
  if (movie.genres?.length) {
    return movie.genres.map((genre) => genre.name).join(', ')
  }

  return '—'
}
