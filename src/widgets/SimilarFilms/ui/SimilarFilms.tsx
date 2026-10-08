import { MovieCard, useGetSimilarFilmsQuery } from '@/entities/Movie'
import { useParams } from 'react-router-dom'
import s from './SimilarFilms.module.css'

export const SimilarFilms = () => {
  const id = useParams().id || ''
  const { data, error, isLoading } = useGetSimilarFilmsQuery(id, {
    skip: !id,
  })

  if (!id) {
    return null
  }

  if (isLoading) {
    return <p className={s.message}>Loading similar movies...</p>
  }

  if (error) {
    return (
      <p className={s.message} role="alert">
        Unable to load similar movies.
      </p>
    )
  }

  const movies = data?.results.slice(0, 6) ?? []

  return (
    <section className={s.section} aria-labelledby="similar-films-title">
      <div className="container">
        <h2 className={s.title} id="similar-films-title">
          Similar movies
        </h2>
        {movies.length ? (
          <div className={s.list}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} item={movie} />
            ))}
          </div>
        ) : (
          <p className={s.message}>No similar movies available.</p>
        )}
      </div>
    </section>
  )
}