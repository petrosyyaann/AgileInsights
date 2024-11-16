import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from 'shared/config/redux/store'

interface ReduxProviderProps {
  children: ReactNode
}

export const CustomReduxProvider = ({ children }: ReduxProviderProps) => (
  <Provider store={store}>{children}</Provider>
)
