import { NavLink } from 'react-router-dom'
import logo from '@/shared/accets/logo/blueShort.svg'
import { MainMenu } from '../MainMenu/MainMenu'

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="wrapper">
          <NavLink to="/">
            <img src={logo} alt="logo" />
            <MainMenu />
          </NavLink>
        </div>
      </div>
    </header>
  )
}
