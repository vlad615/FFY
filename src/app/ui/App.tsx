import { Category } from '@/pages/Categories'
import { Favorites } from '@/pages/Favorites'
import { Main } from '@/pages/Main/ui/Main'
import { NotFound } from '@/pages/NotFound'
import { Search } from '@/pages/Search'
import { MenuPaths, Paths, useGlobalLoading } from '@/shared/lib'
import { Footer } from '@/shared/ui/Footer'
import { Header } from '@/shared/ui/Header'
import { LinerProgress } from '@/shared/ui/LinerProgress'
import { Route, Routes } from 'react-router-dom'
import '../../index.css'
import s from './App.module.css'
import { DetailsMovie } from '@/pages/DetailsMovie'

export function App() {
  const isLoading = useGlobalLoading()
  return (
    <section className={s.body}>
      <Header />
      {isLoading && <LinerProgress />}
      <Routes>
        <Route path={MenuPaths.MAIN.path} element={<Main />} />
        <Route path={MenuPaths.SEARCH.path} element={<Search />} />
        <Route path={MenuPaths.FAVORITES.path} element={<Favorites />} />
        <Route path={Paths.MOVIES.path + '/:category'} element={<Category />} />
        <Route path={Paths.MOVIE.path + '/:id'} element={<DetailsMovie />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </section>
  )
}
