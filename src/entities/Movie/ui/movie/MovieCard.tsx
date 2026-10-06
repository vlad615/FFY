import { memo, useState } from 'react'
import type { Movie } from '../../api/movie.types'
import { IMG_URL } from '@/shared/lib/constans'
import s from './MovieCard.module.css'
import { Icon } from '@/shared/Icons/Icon'

type Props = {
  item: Movie
}

export const MovieCard = memo(({ item }: Props) => {
  const [isLiked, setIsLiked] = useState(false)
  const posterUrl = item.poster_path ? `${IMG_URL}${item.poster_path}` : null

  return (
    <article className={s.card}>
      <div className={s.poster}>
        {posterUrl ? (
          <img className={s.image} src={posterUrl} alt={`${item.title} — poster`} />
        ) : (
          <div className={s.noPoster}>No poster</div>
        )}
        <span className={s.rating} aria-label={`Рейтинг ${item.vote_average.toFixed(1)} из 10`}>
          ★ {item.vote_average.toFixed(1)}
        </span>
        <button
          className={`${s.likeButton} ${isLiked ? s.liked : ''}`}
          type="button"
          aria-label={isLiked ? `Убрать ${item.title} из избранного` : `Добавить ${item.title} в избранное`}
          aria-pressed={isLiked}
          onClick={() => setIsLiked((liked) => !liked)}>
          <Icon iconId="like" height="24" width="24" viewbox="0 0 24 24" fill={isLiked ? s.liked : ''} />
        </button>
      </div>
      <h2 className={s.title} title={item.title}>
        {item.title}
      </h2>
    </article>
  )
})
