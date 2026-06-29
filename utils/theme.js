import { extendTheme } from '@chakra-ui/react'

//  Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// extend the theme
const theme = extendTheme({
  config,
  components: {
    Container: {
      baseStyle: {
        px: { base: 4, md: 8, lg: 16, xl: 20 },
      },
    },
  },
})

export default theme