import React from 'react';
import PropTypes from 'prop-types';
import Articles from '../components/Article/Articles';
import { getBlogPostsAPI } from '../api';

const Index = ({ posts = [] }) => <Articles posts={posts} />;

Index.getInitialProps = async () => {
  // Here we call the API and request 5 documents
  const response = await getBlogPostsAPI({ pageSize: 3 });
  return {
    posts: response.results
  };
};
Index.propTypes = {
  posts: PropTypes.array.isRequired
};
export default Index;
