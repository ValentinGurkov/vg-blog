import React from 'react';
import PropTypes from 'prop-types';
import FeaturedArticle from '../components/Article/FeaturedArticle/FeaturedArticle';
import { getBlogPostsAPI } from '../api';
import { ROOT_URL } from '../lib/config';

const addBreadcrumbsLD = () => ({
  __html: `{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "${ROOT_URL}/"
    }]
  }`
});
const Index = ({ posts = [] }) => (
  <>
    <FeaturedArticle post={posts[0]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={addBreadcrumbsLD()} />
  </>
);

Index.getInitialProps = async () => {
  // Here we call the API and request 1 document
  const response = await getBlogPostsAPI({ pageSize: 1 });
  return {
    posts: response.results
  };
};

Index.propTypes = {
  posts: PropTypes.array.isRequired
};

export default Index;
