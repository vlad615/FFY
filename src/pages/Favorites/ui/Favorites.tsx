import { selectLiked } from '@/entities/User'
import { useAppSelector } from '@/shared/lib'
import { ListMovies } from '@/widgets'
import s from './Favorites.module.css'

export const Favorites = () => {
  const films = useAppSelector(selectLiked)

  return (
    <section id="favorites-page">
      <div className="container">
        <div className={s.wrapper}>
          <h2 className={s.title}>Enjoy your liked films</h2>
          <ListMovies items={films} />
        </div>
      </div>
    </section>
  )
}
