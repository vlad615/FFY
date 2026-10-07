import type { RootState } from '@/app/lib'
import { useSelector } from 'react-redux'

export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    const queries = Object.values(state.movieApi.queries || {})
    const mutations = Object.values(state.movieApi.mutations || {})

    const hasActiveQueries = queries.some((query) => query?.status === 'pending')
    const hasActiveMutations = mutations.some((mutation) => mutation?.status === 'pending')

    return hasActiveQueries || hasActiveMutations
  })
}
