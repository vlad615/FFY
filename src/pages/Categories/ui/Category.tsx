import { useGetCategoryInfMoviesInfiniteQuery } from '@/entities/Movie'
import { CategoriesPaths as Path, Paths } from '@/shared/lib'
import { ListMovies, ListMovieSceleton } from '@/widgets'
import { useCallback, useEffect, useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import s from './Category.module.css'

export const Category = () => {
  const categorySlug = useParams().category
  const category = Object.values(Path).find(({ path }) => path === categorySlug) ?? Path.POPULAR
  const infiniteScrollRef = useRef<HTMLDivElement>(null)

  const { data, error, isLoading, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage } =
    useGetCategoryInfMoviesInfiniteQuery({ category: category.path })

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
    <section id="category-page">
      <div className="container">
        <nav aria-label="Films categories">
          <ul className={s.categories}>
            {Object.values(Path).map(({ title, path }) => (
              <li key={path}>
                <NavLink
                  to={`${Paths.MOVIES.path}/${path}`}
                  className={({ isActive }) => (isActive ? s.activeLink : undefined)}>
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <h1 className={s.title}>{category.title}</h1>
        {error ? (
          <p className={s.message} role="alert">
            Не удалось загрузить фильмы. Попробуйте еще раз.
          </p>
        ) : (
          data?.pages.map(({ page, results }) => <ListMovies key={page} items={results} />)
        )}
      </div>
      {hasNextPage && (
        <div ref={infiniteScrollRef}>
          {isFetchingNextPage ? <ListMovieSceleton rows={5} /> : <div style={{ minHeight: '20px' }} />}
        </div>
      )}
    </section>
  )
}
