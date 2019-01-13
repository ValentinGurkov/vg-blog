import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { getBlogPostAPI } from '../api';
import linkResolver from '../lib/prismic';
import { ROOT_URL } from '../lib/config';

const addJSONLD = (post, info, postUrl, logoUrl) => ({
  __html: `{
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${postUrl}"
    },
    "headline": "${post.og_title[0].text}",
    "image": [
      "${post.og_image.url}"
    ],
    "datePublished": "${info.first_publication_date}",
    "dateModified": "${info.first_publication_date}",
    "author": {
      "@type": "Person",
      "name": "Valentin Gurkov"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Valentin Gurkov",
      "logo": {
        "@type": "ImageObject",
        "url": "${logoUrl}"
      }
    },
    "description": "${post.og_description[0].text}"
  }`
});

const BlogPost = props => {
  const post = props.post.data;
  const info = props.post;
  const postUrl = `${ROOT_URL}/blog/\${info.uuid}`;
  const logoUrl = `${ROOT_URL}/static/og-image.jpg`;
  return (
    <>
      <Head>
        <title key="title">{post.og_title[0].text}</title>
        <meta key="description" name="description" content={post.og_description[0].text} />
        <meta key="keywords" name="keywords" content={post.keywords[0].text} />
        <meta key="og:url" property="og:url" content={postUrl} />
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:title" property="og:title" content={post.og_title[0].text} />
        <meta key="og:description" property="og:description" content={post.og_description[0].text} />
        <meta key="og:image" property="og:image" content={post.og_image.url} />
      </Head>
      <article>
        <h1>{post.title.length ? post.title[0].text : ''}</h1>
        {/* Here we pass our rich text field to Prismics RichText renderer, along with our linkResolver */}
        {RichText.render(post.body, linkResolver)}
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={addJSONLD(post, info, postUrl, logoUrl)} />
    </>
  );
};

BlogPost.getInitialProps = async context => {
  const { slug } = context.query;
  const response = await getBlogPostAPI(slug);
  return {
    post: response
  };
};

BlogPost.propTypes = {
  post: PropTypes.object.isRequired
};

export default BlogPost;
