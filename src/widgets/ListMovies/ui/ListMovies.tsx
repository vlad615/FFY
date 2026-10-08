import { MovieCard, type Movie } from '@/entities/Movie'
import s from './ListMovies.module.css'

type Props = {
  items: Array<Pick<Movie, 'id' | 'poster_path' | 'vote_average' | 'title'>> | undefined
}

export const ListMovies = ({ items }: Props) => {
  return (
    <>
      {items ? (
        <div className={s.movies}>
          {items.map((movie) => (
            <MovieCard key={movie.id} item={movie} />
          ))}
        </div>
      ) : (
        <p className={s.message} role="alert">
          List is empty, try to reload this page.
        </p>
      )}
    </>
  )
}
