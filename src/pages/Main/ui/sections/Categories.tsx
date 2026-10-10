import { MovieCard, useGetCategoryMoviesQuery } from '@/entities/Movie'
import { Paths } from '@/shared/lib'
import { NavLink } from 'react-router-dom'
import s from './Categories.module.css'
import { ListMovieSceleton } from '@/widgets'

type Props = {
  title: string
  path: string
}

export const Categories = ({ title, path }: Props) => {
  const { data, error, isLoading } = useGetCategoryMoviesQuery({ category: path, page: 1 })
  const movies = data?.results ?? []

  if (isLoading) {
    return <ListMovieSceleton columns={6} />
  }

  return (
    <section id={path} className={s.section}>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <NavLink className={s.moreLink} to={`${Paths.MOVIES.path}/${path}`}>
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
