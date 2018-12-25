import React from 'react';
import PropTypes from 'prop-types';
import FeaturedArticle from '../components/Article/FeaturedArticle/FeaturedArticle';
import { getBlogPostsAPI } from '../api';

const Index = ({ posts = [] }) => <FeaturedArticle post={posts[0]} />;

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
