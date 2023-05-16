import '@/styles/globals.scss'
import NextNprogress from 'nextjs-progressbar'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress
        color="crimson"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
    </>
  )
}
