import { memo } from 'react'
import { sortOptions } from '../utils/formValues'
import { DualRange } from '@/shared/ui/DualRange/DualRange'
import { useGetGenresQuery } from '@/entities/Credits'
import s from './FilterForm.module.css'
import type { sort } from '@/entities/Movie'

type Props = {
  sortValue: string
  onSort: (value: sort) => void
  onRaiting: (value: number[]) => void
  onGenre: (value: number[]) => void
  selected: number[]
}

export const FilterForm = memo(({ sortValue, onSort, onRaiting, onGenre, selected }: Props) => {
  const { data } = useGetGenresQuery()

  const handlerSetGenersh = (id: number) => {
    if (selected.includes(id)) {
      onGenre(selected.filter((g) => g !== id))
    } else {
      onGenre([...selected, id])
    }
  }

  const resetStates = () => {
    onSort('popularity.desc')
    onRaiting([0.0, 10.0])
    onGenre([])
  }

  return (
    <form className={s.form}>
      <div>
        <label className={s.label} htmlFor="movie-sort">
          Sort by
        </label>
        <select className={s.select} id="movie-sort" value={sortValue} onChange={(e) => onSort(e.target.value as sort)}>
          {sortOptions.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </div>
      <DualRange min={0.0} max={10.0} step={0.1} onChange={onRaiting} />
      <fieldset className={s.genres}>
        <legend>Genres</legend>
        <div className={s.genreList}>
          {data?.genres.map(({ id, name }) => (
            <button
              className={`${s.genreButton} ${selected.includes(id) ? s.active : ''}`}
              key={id}
              type="button"
              onClick={() => handlerSetGenersh(id)}>
              {name}
            </button>
          ))}
        </div>
      </fieldset>
      <button className={s.resetButton} onClick={resetStates}>
        Reset filters
      </button>
    </form>
  )
})
