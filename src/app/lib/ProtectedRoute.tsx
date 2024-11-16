import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContainerApp } from 'shared/ui'
import Loading from 'pages/loading'
import { refreshWithoutRepeats } from 'shared/api/axios'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('refresh')

      if (!token) {
        navigate('/')
        return setIsLoaded(true)
      }

      try {
        await refreshWithoutRepeats()
      } catch {
        localStorage.removeItem('refresh')
        navigate('/')
      } finally {
        setIsLoaded(true)
      }
    }

    checkAuth()
  }, [navigate])

  if (!isLoaded) return <Loading />

  return <ContainerApp>{children}</ContainerApp>
}
