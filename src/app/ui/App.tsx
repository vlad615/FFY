import { Header } from '@/shared/ui/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import '../../index.css'
import { Main } from '@/pages/Main/ui/Main'
import { MenuPaths, Paths } from '@/shared/lib'
import { Search } from '@/pages/Search'
import { Category } from '@/pages/Categories'

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={MenuPaths.MAIN.path} element={<Main />} />
        <Route path={MenuPaths.SEARCH.path} element={<Search />} />
        <Route
          path={MenuPaths.CATEGORY.path}
          element={<Navigate to={MenuPaths.CATEGORY.path + '/' + Paths.POPULAR.path} />}
        />
        <Route path={MenuPaths.CATEGORY.path + '/:category'} element={<Category />} />
      </Routes>
    </>
  )
}
