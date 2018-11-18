import React from 'react';
import Head from 'next/head';
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

export default Index;
