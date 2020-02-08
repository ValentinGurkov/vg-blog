import Document, { Head, Main, NextScript } from 'next/document';
import { DEFAULT_SEO } from '../lib/config';
import { GA_TRACKING_ID } from '../lib/gtag';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta key="charset" charSet={DEFAULT_SEO.charset} />
          <link key="manifest" rel="manifest" type="application/manifest+json" href="/_next/public/manifest.json" />
          <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
          <meta key="msapplication-TileColor" name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-TileImage" content="/public/icons/mstile-144x144.png" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta key="theme-color" name="theme-color" content="#ff6c0c" />
          <Icons />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400i,400,700" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400i,400,700" rel="preload" as="style" />
          <link href="https://amp.cloudflare.com" rel="preload" as="document" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <link href={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} rel="preload" as="script" />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_TRACKING_ID}')`
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

const Icons = () => (
  <>
    <link key="apple-touch-icon" rel="apple-touch-icon" sizes="180x180" href="/public/icons/apple-touch-icon.png" />
    <link
      key="apple-touch-icon-152x152"
      rel="apple-touch-icon"
      sizes="152x152"
      href="/public/icons/apple-touch-icon-152x152.png"
    />
    <link key="icon-32x32" rel="icon" type="image/png" sizes="32x32" href="/public/icons/favicon-32x32.png" />
    <link key="icon-194x194" rel="icon" type="image/png" sizes="194x194" href="/public/icons/favicon-194x194.png" />
    <link
      key="icon-192x192"
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/public/icons/android-chrome-192x192.png"
    />
    <link key="icon-16x16" rel="icon" type="image/png" sizes="16x16" href="/public/icons/favicon-16x16.png" />
    <link key="mask-icon" rel="mask-icon" href="/public/icons/safari-pinned-tab.svg" color="#414042" />
    <meta key="msapplication-TileColor" name="msapplication-TileColor" content="#da532c" />
    <link
      key="apple-touch-icon-144x144"
      rel="apple-touch-icon"
      sizes="144x144"
      href="/public/icons/apple-touch-icon-144x144.png"
    />
    <link
      key="apple-touch-icon-120x120"
      rel="apple-touch-icon"
      sizes="120x120"
      href="/public/icons/apple-touch-icon-120x120.png"
    />
    <link
      key="apple-touch-icon-60x60"
      rel="apple-touch-icon"
      sizes="60x60"
      href="/public/icons/apple-touch-icon-60x60.png"
    />
    <link
      key="apple-touch-icon-72x72"
      rel="apple-touch-icon"
      sizes="72x72"
      href="/public/icons/apple-touch-icon-72x72.png"
    />
    <link
      key="apple-touch-icon-76x76"
      rel="apple-touch-icon"
      sizes="76x76"
      href="/public/icons/apple-touch-icon-76x76.png"
    />
    <link
      key="apple-touch-icon-114x114"
      rel="apple-touch-icon"
      sizes="114x114"
      href="/public/icons/apple-touch-icon-114x114.png"
    />
    <link
      key="apple-touch-icon-57x57"
      rel="apple-touch-icon"
      sizes="57x57"
      href="/public/icons/apple-touch-icon-57x57.png"
    />
  </>
);
