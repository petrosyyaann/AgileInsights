import { ReactNode } from 'react'
import { ReactStrictModeProvider } from './ReactStrictModeProvider'
import { RouterProvider } from './RouterProvider'
import { ChakraProvider } from './ChakraProvider'

interface CombinedProvidersProps {
  children: ReactNode
}

export const CombinedProviders = ({ children }: CombinedProvidersProps) => {
  return (
    <ReactStrictModeProvider>
      <RouterProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </RouterProvider>
    </ReactStrictModeProvider>
  )
}
