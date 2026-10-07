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
        <div className={s.wrapper}>
          <SearchMovie value={query} />
          {!query ? (
            <p className={s.message}>Enter a movie title to start searching</p>
          ) : !items.length ? (
            <p className={s.message}>No matches found for «{query}»</p>
          ) : (
            <div className={s.wrapperCards}>
              {items.map((movie) => (
                <MovieCard key={movie.id} item={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
