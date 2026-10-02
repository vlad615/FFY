import { Paths } from '@/shared/lib'
import { NavLink } from 'react-router-dom'
import s from './MainMenu.module.css'

type Props = {
  direction?: 'col' | 'row'
  size?: 'sm' | 'lg'
}

export const MainMenu = ({ direction = 'row', size = 'sm' }: Props) => {
  const ulStyle = s.wrapper + (size === 'lg' ? ' ' + s.lgWrapper : '') + (direction === 'col' ? ' ' + s.col : '')
  console.log(ulStyle, s.wrapper)

  // const liStyles =

  return (
    <nav>
      <ul className={ulStyle}>
        {Object.values(Paths).map(({ title, path }) => (
          <li key={path}>
            <NavLink to={path} className={size}>
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
