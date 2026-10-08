import { useSearchMovieQuery } from '@/entities/Movie'
import { SearchMovie } from '@/features/searchMovie'
import { ListMovies } from '@/widgets'
import { useSearchParams } from 'react-router-dom'
import s from './Search.module.css'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')?.trim() ?? ''

  const { data } = useSearchMovieQuery(query, {
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
            <ListMovies items={items} />
          )}
        </div>
      </div>
    </section>
  )
}
