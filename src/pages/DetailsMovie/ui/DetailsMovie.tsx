import { getDuration, getGenres, useGetByIdQuery } from '@/entities/Movie'
import { IMG_URL } from '@/shared/lib'
import s from './DetailsMovie.module.css'

type Props = {
  id: string
}

export const DetailsMovie = ({ id }: Props) => {
  const { data: movie } = useGetByIdQuery(id)

  if (!movie) {
    return null
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '—'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '—'
  const posterUrl = movie.poster_path ? `${IMG_URL}${movie.poster_path}` : null

  return (
    <section className={s.section} id={`details-movie-${movie.id}`}>
      <div className="container">
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
                <span className={s.label}>Год выпуска</span>
                <strong>{releaseYear}</strong>
              </div>
              <div className={s.infoItem}>
                <span className={s.label}>Рейтинг</span>
                <strong>★ {rating}</strong>
              </div>
              <div className={s.infoItem}>
                <span className={s.label}>Жанры</span>
                <strong>{getGenres(movie)}</strong>
              </div>
              <div className={s.infoItem}>
                <span className={s.label}>Продолжительность</span>
                <strong>{getDuration(movie.runtime)}</strong>
              </div>
            </div>

            <div className={s.descriptionBlock}>
              <h2 className={s.subtitle}>Описание</h2>
              <p className={s.description}>{movie.overview || 'Описание фильма отсутствует.'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
