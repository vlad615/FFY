import type { CSSProperties } from 'react'
import s from './ListMovieSceleton.module.css'

type Props = {
  rows?: number
  columns?: number
}

export const ListMovieSceleton = ({ rows = 2, columns = 5 }: Props) => {
  const itemCount = rows * columns

  return (
    <section>
      <div className="container">
        <div
          className={s.list}
          style={{ '--columns': columns } as CSSProperties}
          aria-label="Loading movies"
          aria-busy="true">
          {Array.from({ length: itemCount }, (_, index) => (
            <div className={s.card} key={index} aria-hidden="true">
              <div className={s.poster} />
              <div className={s.title} />
              <div className={s.subtitle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
