import { useSearchMovieQuery } from '@/entities/Movie'
import { SearchMovie } from '@/features/searchMovie'
import { ListMovies } from '@/widgets/movies/ui/ListMovies'
import { useSearchParams } from 'react-router-dom'

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')?.trim() ?? ''

  const { data, isLoading, error } = useSearchMovieQuery(query, {
    skip: !query,
  })

  return (
    <section id="search-page">
      <div className="container">
        <SearchMovie value={query} />
        <ListMovies
          items={data?.results}
          query={query}
          isLoading={isLoading}
          hasError={Boolean(error)}
        />
      </div>
    </section>
  )
}
