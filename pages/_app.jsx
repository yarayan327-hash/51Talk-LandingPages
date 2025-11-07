import '../styles/globals.css'
import '../styles/theme.css'
import { ProgressProvider } from '../context/ProgressContext'

function MyApp({ Component, pageProps }) {
  return (
    <ProgressProvider>
      <Component {...pageProps} />
    </ProgressProvider>
  )
}

export default MyApp