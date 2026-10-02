import { Paths } from '@/shared/lib'
import { NavLink } from 'react-router-dom'

export const MainMenu = () => {
  return (
    <nav>
      <ul>
        {Object.values(Paths).map(({ title, path }) => (
          <li key={path}>
            <NavLink to={path}>{title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
