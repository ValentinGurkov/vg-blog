import React from 'react';
import { DEFAULT_SEO } from '~/config';
import Head from 'next/head';

const DefaultMeta = () => (
  <Head>
    <title key="title">{DEFAULT_SEO.title}</title>
    <meta key="description" name="description" content={DEFAULT_SEO.description} />
    <meta key="keywods" name="keywods" content={DEFAULT_SEO.keywords} />
    <meta key="twitter:card" name="twitter:card" content={DEFAULT_SEO.twitter.cardType} />
    <meta key="twitter:site" name="twitter:site" content={DEFAULT_SEO.twitter.handle} />
    <meta key="og:type" property="og:type" content={DEFAULT_SEO.openGraph.type} />
    <meta key="og:locale" property="og:locale" content={DEFAULT_SEO.openGraph.locale} />
    <meta key="og:image:width" property="og:image:width" content={DEFAULT_SEO.openGraph.imageWidth} />
    <meta key="og:image:height" property="og:image:height" content={DEFAULT_SEO.openGraph.imageHeight} />
    <meta key="og:description" property="og:description" content={DEFAULT_SEO.openGraph.description} />
    <meta key="og:title" property="og:title" content={DEFAULT_SEO.openGraph.title} />
    <meta key="og:image" property="og:image" content={DEFAULT_SEO.openGraph.image} />
    <meta key="og:url" property="og:url" content={DEFAULT_SEO.openGraph.url} />
  </Head>
);

export default DefaultMeta;
