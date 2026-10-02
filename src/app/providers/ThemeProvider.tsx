import { useAppSelector } from '@/shared/lib'
import { useEffect, type ReactNode } from 'react'
import { selectTheme } from '../lib'

type Props = {
  children: ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
  const theme = useAppSelector(selectTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return children
}
