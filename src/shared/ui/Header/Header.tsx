import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
import logo from '@/shared/accets/logo/blueShort.svg'
import { MainMenu } from '../MainMenu'
import { ThemeButton } from '../ThemeButton'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.wrapper}>
          <NavLink to="/">
            <img src={logo} alt="logo" className={s.logo} />
          </NavLink>
          <div className={s.navWrapper}>
            <MainMenu />
            <ThemeButton />
          </div>
        </div>
      </div>
    </header>
  )
}
