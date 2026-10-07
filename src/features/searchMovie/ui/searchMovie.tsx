import { useState, type SubmitEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MenuPaths } from '@/shared/lib'
import s from './SearchMovie.module.css'

type Props = {
  value?: string
}

export const SearchMovie = ({ value = '' }: Props) => {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(value)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value === '' && searchParams.get('query')?.trim()) {
      navigate(`${MenuPaths.SEARCH.path}`)
    }
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(`${MenuPaths.SEARCH.path}?query=${encodeURIComponent(query.trim())}`)
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
        onChange={(event) => handleChange(event)}
      />
      <button className={s.searchButton} type="submit" disabled={!query.trim()}>
        Искать
      </button>
    </form>
  )
}
