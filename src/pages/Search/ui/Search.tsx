import { useSearchMovieInfiniteQuery } from '@/entities/Movie'
import { SearchMovie } from '@/features/searchMovie'
import { ListMovies, ListMovieSceleton } from '@/widgets'
import { useSearchParams } from 'react-router-dom'
import s from './Search.module.css'
import { useCallback, useEffect, useRef } from 'react'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')?.trim() ?? ''
  const infiniteScrollRef = useRef<HTMLDivElement>(null)
  const { data, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useSearchMovieInfiniteQuery(
    { query },
    { skip: !query }
  )

  const items = data?.pages ?? []

  const loadMoreHandler = useCallback(() => {
    if (hasNextPage && !isFetching) {
      void fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetching])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        loadMoreHandler()
      }
    })

    const sentinel = infiniteScrollRef.current
    if (sentinel && hasNextPage) {
      observer.observe(sentinel)
    }

    return () => observer.disconnect()
  }, [hasNextPage, loadMoreHandler])

  if (isLoading) {
    return <ListMovieSceleton rows={5} />
  }

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
            items.map(({ page, results }) => <ListMovies key={page} items={results} />)
          )}
        </div>
        {hasNextPage && (
          <div ref={infiniteScrollRef}>{isFetchingNextPage ? <ListMovieSceleton rows={5} /> : <div />}</div>
        )}
      </div>
    </section>
  )
}
