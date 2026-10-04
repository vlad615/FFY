import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paths } from '@/shared/lib'
import s from './SearchMovie.module.css'

type Props = {
  value?: string
}

export const SearchMovie = ({ value = '' }: Props) => {
  const [query, setQuery] = useState(value)
  const navigate = useNavigate()

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(`${Paths.SEARCH.path}?query=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form className={s.searchForm} role="search" onSubmit={handleSubmit}>
      <input
        className={s.searchInput}
        type="search"
        name="query"
        placeholder="Название фильма"
        aria-label="Название фильма"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button className={s.searchButton} type="submit" disabled={!query.trim()}>
        Искать
      </button>
    </form>
  )
}
