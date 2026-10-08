import { useGetCreditsQuery } from '@/entities/Credits'
import { IMG_URL } from '@/shared/lib'
import { useParams } from 'react-router-dom'
import s from './Casts.module.css'

export const Casts = () => {
  const id = useParams().id || ''
  const { data, error, isLoading } = useGetCreditsQuery(id, {
    skip: id ? false : true,
  })

  if (isLoading) {
    return <p className={s.message}>Loading cast...</p>
  }

  if (error) {
    return (
      <p className={s.message} role="alert">
        Unable to load the cast.
      </p>
    )
  }

  const cast = data?.cast.slice(0, 6) ?? []

  return (
    <section className={s.section} aria-labelledby="cast-title">
      <div className="container">
        <h2 className={s.title} id="cast-title">
          Cast
        </h2>
        {cast.length ? (
          <ul className={s.list}>
            {cast.map((actor) => (
              <li className={s.card} key={actor.credit_id}>
                {actor.profile_path ? (
                  <img className={s.image} src={`${IMG_URL}${actor.profile_path}`} alt={actor.name} loading="lazy" />
                ) : (
                  <div className={s.noImage} aria-hidden="true">
                    No photo
                  </div>
                )}
                <h3 className={s.name}>{actor.name}</h3>
                <p className={s.character}>{actor.character || '—'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={s.message}>No cast information available.</p>
        )}
      </div>
    </section>
  )
}
