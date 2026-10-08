import { useGetCategoryMoviesQuery } from '@/entities/Movie'
import { CategoriesPaths as Path, Paths } from '@/shared/lib'
import { ListMovies, ListMovieSceleton } from '@/widgets'
import { NavLink, useParams } from 'react-router-dom'
import s from './Category.module.css'

export const Category = () => {
  const categorySlug = useParams().category
  const category = Object.values(Path).find(({ path }) => path === categorySlug) ?? Path.POPULAR
  const { data, error, isLoading } = useGetCategoryMoviesQuery(category.path)

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
          <ListMovies items={data?.results} />
        )}
      </div>
    </section>
  )
}
