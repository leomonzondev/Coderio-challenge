import '../styles/output.css'
import type { AppProps } from 'next/app'

import { SnackbarProvider } from 'notistack'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
      }}>
        <Component {...pageProps} />
      </SnackbarProvider>
  )
}

export default MyApp
