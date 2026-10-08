import { getDuration, getGenres, useGetByIdQuery } from '@/entities/Movie'
import { IMG_URL } from '@/shared/lib'
import s from './DetailsMovie.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { Casts, SimilarFilms } from '@/widgets'

export const DetailsMovie = () => {
  const navigate = useNavigate()
  const id = useParams().id || ''
  const { data: movie } = useGetByIdQuery(id, {
    skip: !id,
  })

  if (!movie) {
    return null
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '—'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '—'
  const posterUrl = movie.poster_path ? `${IMG_URL}${movie.poster_path}` : null

  return (
    <>
      <section id={`details-movie-${movie.id}`}>
        <div className="container">
          <button className={s.backButton} type="button" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <div className={s.wrapper}>
            <div className={s.posterBlock}>
              {posterUrl ? (
                <img className={s.image} src={posterUrl} alt={`${movie.title} — poster`} />
              ) : (
                <div className={s.noPoster}>No poster</div>
              )}
            </div>

            <div className={s.content}>
              <h1 className={s.title}>{movie.title}</h1>

              <div className={s.infoList}>
                <div className={s.infoItem}>
                  <span className={s.label}>Release year</span>
                  <strong>{releaseYear}</strong>
                </div>
                <div className={s.infoItem}>
                  <span className={s.label}>Rating</span>
                  <strong>★ {rating}</strong>
                </div>
                <div className={s.infoItem}>
                  <span className={s.label}>Genres</span>
                  <strong>{getGenres(movie)}</strong>
                </div>
                <div className={s.infoItem}>
                  <span className={s.label}>Runtime</span>
                  <strong>{getDuration(movie.runtime)}</strong>
                </div>
              </div>

              <div className={s.descriptionBlock}>
                <h2 className={s.subtitle}>Overview</h2>
                <p className={s.description}>{movie.overview || 'No overview available.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Casts />
      <SimilarFilms />
    </>
  )
}
