import type { RootState } from '@/app/lib'
import { useSelector } from 'react-redux'

const excludedEndpoints = ['getCategoryMovies']

export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    const queries = Object.values(state.movieApi.queries || {})
    const mutations = Object.values(state.movieApi.mutations || {})

    const hasActiveQueries = queries.some((query) => {
      if (query?.status !== 'pending') return
      if (excludedEndpoints.includes(query.endpointName)) {
        const completedQueries = queries.filter((q) => q?.status === 'fulfilled')
        return completedQueries.length > 0
      }
    })
    const hasActiveMutations = mutations.some((mutation) => mutation?.status === 'pending')

    return hasActiveQueries || hasActiveMutations
  })
}
