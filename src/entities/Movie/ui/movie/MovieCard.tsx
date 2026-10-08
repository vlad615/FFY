import { memo, useState } from 'react'
import type { Movie } from '../../api/movie.types'
import { IMG_URL } from '@/shared/lib/constans/constans'
import s from './MovieCard.module.css'
import { Icon } from '@/shared/Icons/Icon'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { addFilm, removeFilm, selectLiked } from '@/entities/User'
import { useNavigate } from 'react-router-dom'

type Props = {
  item: Pick<Movie, 'id' | 'poster_path' | 'vote_average' | 'title'>
}

export const MovieCard = memo(({ item }: Props) => {
  const dispatch = useAppDispatch()
  const liked = useAppSelector(selectLiked)
  const navigate = useNavigate()
  const posterUrl = item.poster_path ? `${IMG_URL}${item.poster_path}` : null
  const like = liked.find((film) => film.id === item.id) || 0
  const [isLiked, setIsLiked] = useState(like ? true : false)

  const clickLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsLiked(!isLiked)
    if (isLiked) {
      dispatch(removeFilm({ id: item.id }))
    } else {
      dispatch(
        addFilm({
          film: {
            ...item,
            poster_path: item.poster_path || '',
          },
        })
      )
    }
  }

  return (
    <article className={s.card} onClick={() => navigate(`movie/${item.id}`)}>
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
          onClick={(e) => clickLike(e)}>
          <Icon iconId="like" height="24" width="24" viewbox="0 0 24 24" fill={isLiked ? s.liked : ''} />
        </button>
      </div>
      <h2 className={s.title} title={item.title}>
        {item.title}
      </h2>
    </article>
  )
})
