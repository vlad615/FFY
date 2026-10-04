import { useSearchMovieQuery } from '@/entities/Movie'
import { SearchMovie } from '@/features/searchMovie'
import { useSearchParams } from 'react-router-dom'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')?.trim() ?? ''

  const { data, isLoading, error } = useSearchMovieQuery(query, {
    skip: !query,
  })
  console.log(data)

  return (
    <section id="search-page">
      <div className="container">
        <SearchMovie value={query} />
      </div>
    </section>
  )
}
