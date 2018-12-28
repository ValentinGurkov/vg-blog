import Document, { Head, Main, NextScript } from 'next/document';
import { DEFAULT_SEO } from '../config';
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
          <link key="manifest" rel="manifest" href="/_next/static/manifest.json" />
          <link
            key="apple-touch-icon-57x57"
            rel="apple-touch-icon"
            sizes="57x57"
            href="/static/icons/apple-touch-icon-57x57.png"
          />
          <link
            key="apple-touch-icon-60x60"
            rel="apple-touch-icon"
            sizes="60x60"
            href="/static/icons/apple-touch-icon-60x60.png"
          />
          <link
            key="apple-touch-icon-72x72"
            rel="apple-touch-icon"
            sizes="72x72"
            href="/static/icons/apple-touch-icon-72x72.png"
          />
          <link
            key="apple-touch-icon-76x76"
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/icons/apple-touch-icon-76x76.png"
          />
          <link
            key="apple-touch-icon-114x114"
            rel="apple-touch-icon"
            sizes="114x114"
            href="/static/icons/apple-touch-icon-114x114.png"
          />
          <link
            key="apple-touch-icon-120x120"
            rel="apple-touch-icon"
            sizes="120x120"
            href="/static/icons/apple-touch-icon-120x120.png"
          />
          <link
            key="apple-touch-icon-144x144"
            rel="apple-touch-icon"
            sizes="144x144"
            href="/static/icons/apple-touch-icon-144x144.png"
          />
          <link
            key="apple-touch-icon-152x152"
            rel="apple-touch-icon"
            sizes="152x152"
            href="/static/icons/apple-touch-icon-152x152.png"
          />
          <link
            key="apple-touch-icon-180x180"
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/icons/apple-touch-icon-180x180.png"
          />
          <link key="icon-32x32" rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
          <link key="icon-16x16" rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
          <link key="manifest" rel="manifest" href="/_next/static/manifest.json" />
          <link key="mask-icon" rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#414042" />
          <link key="shortcut icon" rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="robots" content="index,follow" />
          <meta key={DEFAULT_SEO.charset} charSet={DEFAULT_SEO.charset} />
          <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
          <meta key="msapplication-TileColor" name="msapplication-TileColor" content="#da532c" />
          <meta key="msapplication-config" name="msapplication-config" content="/static/icons/browserconfig.xml" />
          <meta key="theme-color" name="theme-color" content="#ff6c0c" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `
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
