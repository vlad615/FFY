import { MenuPaths } from '@/shared/lib'
import { NavLink } from 'react-router-dom'
import s from './MainMenu.module.css'

type Props = {
  direction?: 'col' | 'row'
  size?: 'sm' | 'lg'
}

export const MainMenu = ({ direction = 'row', size = 'sm' }: Props) => {
  const ulStyle = s.wrapper + (size === 'lg' ? ' ' + s.lgWrapper : '') + (direction === 'col' ? ' ' + s.col : '')

  return (
    <nav>
      <ul className={ulStyle}>
        {Object.values(MenuPaths).map(({ title, path }) => (
          <li key={path}>
            <NavLink to={path} className={({ isActive }) => `${isActive ? s.activeLink : s.link}`}>
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
