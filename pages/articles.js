import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Articles from '../components/Article/Articles';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';
import { getBlogPostsAPI } from '../api';
import { ROOT_URL, DEFAULT_SEO } from '../lib/config';

const breadcrumbs = [
  {
    url: '/',
    page: 'Home'
  },
  {
    url: '/articles',
    page: 'Articles'
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
      "name": "Articles",
      "item":"${ROOT_URL}/articles"
    }]
  }`
});

const Index = ({ posts = [] }) => (
  <>
    <Head>
      <title key="title">{`Articles | ${DEFAULT_SEO.title}`}</title>
      <link key="canonical" rel="canonical" href={`${DEFAULT_SEO.canonical}/articles`} />
      <meta
        key="description"
        name="description"
        content="Valentin Gurkov's Blog articles page. View all of our articles"
      />
    </Head>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    <Articles posts={posts} />
    <script type="application/ld+json" dangerouslySetInnerHTML={addBreadcrumbsLD()} />
  </>
);

Index.getInitialProps = async () => {
  const response = await getBlogPostsAPI({ pageSize: 3 });
  return {
    posts: response.results
  };
};

Index.propTypes = {
  posts: PropTypes.array.isRequired
};

export default Index;
