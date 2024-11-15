import { ChakraProvider as ChakraCoreProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import theme from 'shared/config/chakraTheme/globalStyles'

interface ChakraProviderProps {
  children: ReactNode
}

export const ChakraProvider = ({ children }: ChakraProviderProps) => {
  return <ChakraCoreProvider theme={theme}>{children}</ChakraCoreProvider>
}
