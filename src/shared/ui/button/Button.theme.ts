import { defineStyleConfig } from '@chakra-ui/react'

export const ButtonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: '7px',
    fontWeight: '400',
    fontSize: '14px',
    background: 'blue.300',
    color: 'white',
    _hover: { background: 'blue.400', color: 'white' },
    _disabled: { background: 'gray.200', opacity: 1 },
  },
  variants: {
    baseStyle: {
      background: 'blue.300',
      color: 'white',
      _hover: { background: 'blue.400', color: 'white' },
      _disabled: { background: 'gray.200', opacity: 1 },
    },
    delete: {
      w: '100px',
      background: 'red.400',
      borderRadius: '15px',
      fontWeight: 500,
      textAlign: 'center',
      _hover: {
        background: 'red.500',
        color: 'white',
      },
    },
    transparent: {
      background: 'transparent',
      textAlign: 'center',
      color: 'gray.500',
      _hover: {
        background: 'transparent',
        color: 'gray.600',
      },
    },
  },
})
