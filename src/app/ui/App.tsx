import { Category } from '@/pages/Categories'
import { Main } from '@/pages/Main/ui/Main'
import { NotFound } from '@/pages/NotFound'
import { Search } from '@/pages/Search'
import { MenuPaths, CategoriesPaths as Path } from '@/shared/lib'
import { Footer } from '@/shared/ui/Footer'
import { Header } from '@/shared/ui/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import '../../index.css'
import s from './App.module.css'

export function App() {
  return (
    <section className={s.body}>
      <Header />
      <Routes>
        <Route path={MenuPaths.MAIN.path} element={<Main />} />
        <Route path={MenuPaths.SEARCH.path} element={<Search />} />
        <Route
          path={MenuPaths.CATEGORY.path}
          element={<Navigate to={MenuPaths.CATEGORY.path + '/' + Path.POPULAR.path} />}
        />
        <Route path={MenuPaths.CATEGORY.path + '/:category'} element={<Category />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </section>
  )
}
