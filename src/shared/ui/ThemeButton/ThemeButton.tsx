import { changeThemeAC, selectTheme } from '@/app/lib'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import s from './ThemeButton.module.css'
import { Icon } from '@/shared/Icons/Icon'

export const ThemeButton = () => {
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  const newTheme = theme === 'dark' ? 'light' : 'dark'

  function onClick() {
    dispatch(changeThemeAC(newTheme))
    localStorage.setItem('theme', newTheme)
  }

  return (
    <button onClick={onClick} className={s.wrapper}>
      <Icon iconId={newTheme} />
    </button>
  )
}
