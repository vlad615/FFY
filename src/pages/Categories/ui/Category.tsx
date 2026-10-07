import { MovieCard, useGetCategoryMoviesQuery } from '@/entities/Movie'
import { MenuPaths, Paths } from '@/shared/lib'
import { NavLink, useParams } from 'react-router-dom'
import s from './Category.module.css'

export const Category = () => {
  const categorySlug = useParams().category
  const category = Object.values(Paths).find(({ path }) => path === categorySlug) ?? Paths.POPULAR
  const { data, isLoading, error } = useGetCategoryMoviesQuery(category.path)

  return (
    <section id="category-page">
      <div className="container">
        <nav aria-label="Films categories">
          <ul className={s.categories}>
            {Object.values(Paths).map(({ title, path }) => (
              <li key={path}>
                <NavLink
                  to={`${MenuPaths.CATEGORY.path}/${path}`}
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
          <div className={s.movies}>
            {data?.results.map((movie) => (
              <MovieCard key={movie.id} item={movie} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
