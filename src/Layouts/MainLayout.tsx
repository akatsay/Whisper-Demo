import Head from 'next/head'

export function MainLayout({
  children,
  title,
}: {
  children: any
  title?: string
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="keywords"
          content="nextjs, WhisperAPI, OpenAI"
        />
        <meta
          name="description"
          content="this is next.js version of joke generator"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  )
}
