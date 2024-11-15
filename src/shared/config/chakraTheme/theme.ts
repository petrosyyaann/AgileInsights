import { extendTheme } from '@chakra-ui/react'
import 'shared/config/fonts/fonts.css'
import {
  ButtonTheme,
  InputTheme,
  TextTheme,
} from 'shared/ui'

export const theme = extendTheme({
  components: {
    Button: ButtonTheme,
    Input: InputTheme,
    Text: TextTheme,
  },
  fonts: {
    heading: 'EuclidFlex, EuclidFlex, EuclidFlex, EuclidFlex',
    body: 'EuclidFlex, EuclidFlex, EuclidFlex, EuclidFlex',
  },
  styles: {
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
  },
  colors: {
    black: {
      100: '#161F29',
    },
    blue: {
      100: '#F6F9FF',
      200: '#D0E0FF',
      300: '#6D9AF2',
      400: '#507FDA',
      500: '#2452AD',
    },
    mallow: {
      100: '#EFF0FF',
      200: '#DADDFC',
      300: '#BABFE9',
      400: '#9BA0D0',
    },
    gray: {
      100: '#F7F9FE',
      200: '#ECEEF3',
      300: '#D9DCE4',
      400: '#CBD1DE',
      500: '#B1B6C5',
      600: '#8B92A4',
    },
    red: {
      400: '#F26D6D',
      500: '#AD2424',
    },
  },
})
