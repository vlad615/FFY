import { MovieCard, useGetCategoryMoviesQuery } from '@/entities/Movie'
import { MenuPaths } from '@/shared/lib'
import { NavLink } from 'react-router-dom'
import s from './Categories.module.css'

type Props = {
  title: string
  path: string
}

export const Categories = ({ title, path }: Props) => {
  const { data, isLoading, error } = useGetCategoryMoviesQuery(path)
  const movies = data?.results ?? []

  return (
    <section id={path} className={s.section}>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <NavLink className={s.moreLink} to={`${MenuPaths.CATEGORY.path}/${path}`}>
          Show more
        </NavLink>
      </div>
      {error ? (
        <p className={s.message} role="alert">
          Не удалось загрузить фильмы. Попробуйте позже.
        </p>
      ) : (
        <div className={s.movies}>
          {movies.slice(0, 6).map((movie) => (
            <MovieCard key={movie.id} item={movie} />
          ))}
        </div>
      )}
    </section>
  )
}
