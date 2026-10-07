import { MovieCard, useSearchMovieQuery } from '@/entities/Movie'
import { SearchMovie } from '@/features/searchMovie'
import { useSearchParams } from 'react-router-dom'
import s from './Search.module.css'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')?.trim() ?? ''

  const { data, isLoading, error } = useSearchMovieQuery(query, {
    skip: !query,
  })
  const items = data?.results ?? []

  return (
    <section id="search-page">
      <div className="container">
        <SearchMovie value={query} />
        {!query ? (
          <p className={s.message}>Введите название для поиска</p>
        ) : !items.length ? (
          <p className={s.message}>По запросу «{query}» ничего не найдено</p>
        ) : (
          <div className={s.wrapper}>
            {items.map((movie) => (
              <MovieCard key={movie.id} item={movie} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
