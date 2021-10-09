import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    saltBox: '#705E78',
    mulberry: '#BF4594',
    persimmon: '#553c9a',
    tidal: '#F3FEB0',
    blueMarguerite: '#FFD432',
  },
})

export default theme
