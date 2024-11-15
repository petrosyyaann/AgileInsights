import LoadingPage from 'pages/loading'
import { ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

interface RouterProviderProps {
  children: ReactNode
}

export const RouterProvider = ({ children }: RouterProviderProps) => (
  <BrowserRouter
    future={{
      v7_relativeSplatPath: true,
    }}
  >
    <Suspense fallback={<LoadingPage />}>{children}</Suspense>
  </BrowserRouter>
)
