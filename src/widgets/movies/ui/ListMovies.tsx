import { MovieCard, type Movie } from '@/entities/Movie'
import s from './ListMovies.module.css'
import { memo } from 'react'

type Props = {
  items?: Movie[]
  query: string
  isLoading?: boolean
  hasError?: boolean
}

export const ListMovies = memo(({ items, query, isLoading = false, hasError = false }: Props) => {
  if (hasError) {
    return (
      <p className={s.message} role="alert">
        Не удалось загрузить фильмы. Попробуйте еще раз.
      </p>
    )
  }

  if (!query) {
    return <p className={s.message}>Введите название для поиска</p>
  }

  if (isLoading) {
    return <p className={s.message}>Поиск фильмов...</p>
  }

  if (!items?.length) {
    return <p className={s.message}>По запросу «{query}» ничего не найдено</p>
  }

  return (
    <div className={s.wrapper}>
      {items.map((movie) => (
        <MovieCard key={movie.id} item={movie} />
      ))}
    </div>
  )
})
