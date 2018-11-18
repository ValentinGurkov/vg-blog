import React from 'react';
import Head from 'next/head';
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

export default Index;
