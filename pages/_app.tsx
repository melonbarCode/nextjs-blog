import '@/css/tailwind.css'
import '@/css/prism.css'
import '@/css/animation.css'

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import { animated, Transition } from 'react-spring'
import { useRouter } from 'next/router'

const isDevelopment = process.env.NODE_ENV === 'development'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const items = [
    {
      id: router.route,
      Component,
      pageProps,
    },
  ]

  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Transition
          items={items}
          keys={(item) => item.id}
          from={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          enter={{ opacity: 1, position: 'relative', left: '0' }}
          leave={{ opacity: 1, position: 'absolute', left: '-100%' }}
        >
          {(styles, { pageProps: animatedPageProps, Component: AnimatedComponent, id }) => (
            <animated.div
              key={id}
              style={{
                ...styles,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <AnimatedComponent {...animatedPageProps} />
            </animated.div>
          )}
        </Transition>
      </LayoutWrapper>
      {/* <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper> */}
    </ThemeProvider>
  )
}
