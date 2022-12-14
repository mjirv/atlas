import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import EventStreamsProvider from '@/components/EventStreamsProvider'

const colors = {
  brand: {
    900: `#1a365d`,
    800: `#153e75`,
    700: `#2a69ac`,
  },
}

export const theme = extendTheme({ colors })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <EventStreamsProvider>
        <Component {...pageProps} />
      </EventStreamsProvider>
    </ChakraProvider>
  )
}
