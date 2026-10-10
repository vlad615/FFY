import { useSearchMovieQuery } from '@/entities/Movie'
import { SearchMovie } from '@/features/searchMovie'
import { ListMovies, ListMovieSceleton } from '@/widgets'
import { useSearchParams } from 'react-router-dom'
import s from './Search.module.css'
import { Pagination } from '@/shared/ui/Pagination'
import { useState } from 'react'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')?.trim() ?? ''
  const [page, setPage] = useState(1)
  const { data, isLoading } = useSearchMovieQuery({ query, page }, {
    skip: !query,
  })

  if (isLoading) {
    return <ListMovieSceleton rows={5} />
  }

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
      <Pagination currentPage={page} setCurrentPage={setPage} pagesCount={data?.total_pages || 1} />
    </section>
  )
}
