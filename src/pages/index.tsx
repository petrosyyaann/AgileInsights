import { ProtectedRoute } from 'app/lib/ProtectedRoute'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { DefaultLayout, Flex, LoginLayout, Text } from 'shared/ui'

const HomePage = lazy(() => import('./home'))
const LoginPage = lazy(() => import('./login'))
const RegistrationPage = lazy(() => import('./registration'))

export default function Routing() {
  return (
    <DefaultLayout>
        <Routes>
          <Route
            path={'/home'}
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/'}
            element={
              <LoginLayout>
                <LoginPage />
              </LoginLayout>
            }
          />
          <Route
            path={'/registration'}
            element={
              <LoginLayout>
                <RegistrationPage />
              </LoginLayout>
            }
          />
          <Route
            path={'*'}
            element={
              <Flex
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="center"
              >
                <Text>404 page</Text>
              </Flex>
            }
          />
        </Routes>
    </DefaultLayout>
  )
}
