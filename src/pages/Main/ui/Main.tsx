import { useGetPopularMoviesQuery } from '@/entities/Movie/api/movieApi'
import { IMG_URL_ORIGINAL } from '@/shared/lib/constans'
import s from './Main.module.css'
import { SearchMovie } from '@/features/searchMovie'

export const Main = () => {
  const { data, isLoading } = useGetPopularMoviesQuery()

  const randomBg = IMG_URL_ORIGINAL + data?.results[Math.floor(Math.random() * data?.results.length)].backdrop_path

  return (
    <section id="page_main" className="container">
      <section
        id="main"
        className={s.wrapper}
        style={{
          backgroundImage: `linear-gradient(rgba(4, 21, 45, 0) 0%, rgb(18, 18, 18) 79.17%), url(${randomBg})`,
        }}>
        <div className={s.content}>
          <h1 className={s.title}>Добро пожаловать в мир кино</h1>
          <p className={s.description}>Находите фильмы для любого настроения</p>
          <SearchMovie />
        </div>
      </section>
    </section>
  )
}
