import React from 'react';
import Head from 'next/head';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';
import { ROOT_URL, DEFAULT_SEO } from '../lib/config';

const breadcrumbs = [
  {
    url: '/',
    page: 'Home'
  },
  {
    url: '/our-mission',
    page: 'Our Mission'
  }
];

const addBreadcrumbsLD = () => ({
  __html: `{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "${ROOT_URL}/"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Our Mission",
      "item":"${ROOT_URL}/our-mission"
    }]
  }`
});

const ourMission = () => (
  <>
    <Head>
      <title key="title">{`Our Mission | ${DEFAULT_SEO.title}`}</title>
      <link key="canonical" rel="canonical" href={`${DEFAULT_SEO.canonical}/our-mission`} />
      <meta key="description" name="description" content="Valentin Gurkov's Blog our mission page" />
      <meta key="keywords" name="keywords" content={`${DEFAULT_SEO.keywords}, our mission`} />
    </Head>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    <div>This page is under construction. Check back soon!</div>
    <script type="application/ld+json" dangerouslySetInnerHTML={addBreadcrumbsLD()} />
  </>
);

export default ourMission;
