import { useAppSelector } from '@/shared/lib'
import s from './Favorites.module.css'
import { selectLiked } from '@/entities/User'
import { MovieCard } from '@/entities/Movie'

export const Favorites = () => {
    const films = useAppSelector(selectLiked)

    return (
        <section id='favorites-page'>
            <div className="container">
                <div className={s.wrapper}>
                    <h2 className={s.title}>Enjoy your liked films</h2>
                    <div className={s.cardWrapper}>
                        {films.map(i => <MovieCard key={i.id} item={{
                            ...i, poster_path: i.posterUrl,
                            vote_average: i.voteAvarage
                        }} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}