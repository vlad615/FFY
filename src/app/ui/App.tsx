import { Category } from '@/pages/Categories'
import { Main } from '@/pages/Main/ui/Main'
import { NotFound } from '@/pages/NotFound'
import { Search } from '@/pages/Search'
import { MenuPaths, CategoriesPaths as Path, useGlobalLoading } from '@/shared/lib'
import { Footer } from '@/shared/ui/Footer'
import { Header } from '@/shared/ui/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import '../../index.css'
import s from './App.module.css'
import { Favorites } from '@/pages/Favorites'
import { LinerProgress } from '@/shared/ui/LinerProgress'

export function App() {
  const isLoading = useGlobalLoading(

  )
  return (
    <section className={s.body}>
      <Header />
      {isLoading && <LinerProgress />}
      <Routes>
        <Route path={MenuPaths.MAIN.path} element={<Main />} />
        <Route path={MenuPaths.SEARCH.path} element={<Search />} />
        <Route path={MenuPaths.FAVORITES.path} element={<Favorites />} />
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
