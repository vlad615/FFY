import { Header } from '@/shared/ui/Header'
import { Route, Routes } from 'react-router-dom'
import '../../index.css'
import { Main } from '@/pages/Main/ui/Main'
import { Paths } from '@/shared/lib'
import { Search } from '@/pages/Search'

export function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path={Paths.MAIN.path} element={<Main />} />
        <Route path={Paths.SEARCH.path} element={<Search />} />
      </Routes>
    </>
  )
}
