import { useSelector } from 'react-redux'
import type { RootState } from '@/app/lib/store'

export const useAppSelector = useSelector.withTypes<RootState>()
