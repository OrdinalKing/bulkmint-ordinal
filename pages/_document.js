import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html >
  )
}
