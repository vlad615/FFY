import { MovieCard, useDiscoverMovieInfiniteQuery, type sort } from '@/entities/Movie'
import { FilterForm } from '@/widgets/FiltersForm'
import { useCallback, useEffect, useRef, useState } from 'react'
import s from './Filtered.module.css'
import { ListMovieSceleton } from '@/widgets'
import { useDebounceValue } from '@/shared/lib'

export const Filtered = () => {
  const [sort, setSort] = useState<sort>('popularity.desc')
  const [raiting, setRaiting] = useState<number[]>([0.0, 10.0])
  const [genres, setGenres] = useState<number[]>([])
  const infiniteScrollRef = useRef<HTMLDivElement>(null)

  const debounesRaiting = useDebounceValue(raiting)
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage } = useDiscoverMovieInfiniteQuery(
    {
      sort_by: sort,
      'vote_average.gte': debounesRaiting[0],
      'vote_average.lte': debounesRaiting[1],
      with_genres: genres.join(','),
    }
  )

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

  const result = data?.pages.flatMap((p) => p.results) || []

  return (
    <section id="filtered-page">
      <div className="container">
        <div className={s.wrapper}>
          <FilterForm sortValue={sort} onSort={setSort} onRaiting={setRaiting} onGenre={setGenres} selected={genres} />
          <div className={s.cardWrapper}>
            {result.map((film) => (
              <MovieCard key={film.id} item={film} />
            ))}
          </div>
        </div>
        {hasNextPage && (
          <div ref={infiniteScrollRef}>
            {isFetchingNextPage ? <ListMovieSceleton rows={5} /> : <div style={{ minHeight: '20px' }} />}
          </div>
        )}
      </div>
    </section>
  )
}
