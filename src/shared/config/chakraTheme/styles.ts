import { Styles } from '@chakra-ui/theme-tools'

export const styles: Styles = {
  global: {
    body: {
      height: '100vh',
      width: '100vw',
      maxHeight: '100vh',
      maxWidth: '100vw',
      overflow: 'hidden',
    },
    '#root': {
      height: '100%',
      width: '100%',
    },
    '&::-webkit-scrollbar': {
      width: '0',
    },
    '&::-webkit-scrollbar-track': {
      width: '0',
    },
  },
}
