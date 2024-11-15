import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { PageRoutes } from 'shared/config/pages/PageRoutes'
// import { DefaultLayout } from 'shared/ui'
// import { Menu } from 'widgets/index'

const HomePage = lazy(() => import('./home'))
const Error404 = lazy(() => import('./error-404'))

export default function Routing() {
  return (
    <Routes>
      <Route path={PageRoutes.Page404} element={<Error404 />} />
      <Route path={PageRoutes.Login} element={<HomePage />} />
    </Routes>
  )
}
