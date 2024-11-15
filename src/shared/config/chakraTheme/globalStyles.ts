import { extendTheme } from '@chakra-ui/react'
// import { components } from './components'
import { colors } from './colors'
import { styles } from './styles'
import config from './config'
import fonts from '../fonts/fonts'

const theme = extendTheme({
  config,
  styles,
  colors,
  // components,
  fonts,
  breakpoints: {
    sm: '100px',
    base: '1280px',
    md: '1920px',
    lg: '2560px',
  },
})

export default theme
