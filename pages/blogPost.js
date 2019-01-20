import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';
import { getBlogPostAPI } from '../api';
import linkResolver from '../lib/prismic';
import { ROOT_URL } from '../lib/config';

const getBreadrumbs = (slug, articleName) => [
  {
    url: '/',
    page: 'Home'
  },
  {
    url: '/articles',
    page: 'Articles'
  },
  {
    url: `/blog/${slug}`,
    page: articleName
  }
];

const addArticleLD = (post, info, postUrl, logoUrl) => ({
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

const addBreadcrumbsLD = (slug, article) => ({
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
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "${article}",
      "item":"${ROOT_URL}/blog/${slug}"
    }]
  }`
});

const BlogMeta = props => (
  <Head>
    <title key="title">{props.post.og_title[0].text}</title>
    <meta key="description" name="description" content={props.post.og_description[0].text} />
    <meta key="keywords" name="keywords" content={props.post.keywords[0].text} />
    <meta key="og:url" property="og:url" content={props.postUrl} />
    <meta key="og:type" property="og:type" content="article" />
    <meta key="og:title" property="og:title" content={props.post.og_title[0].text} />
    <meta key="og:description" property="og:description" content={props.post.og_description[0].text} />
    <meta key="og:image" property="og:image" content={props.post.og_image.url} />
    <meta key="og:image:alt" property="og:image:alt" content={props.post.og_image.alt} />
  </Head>
);

BlogMeta.propTypes = {
  post: PropTypes.object.isRequired,
  postUrl: PropTypes.string
};

const BlogPost = props => {
  const post = props.post.data;
  const info = props.post;
  const blogSlug = info.uid;
  const postUrl = `${ROOT_URL}/blog/${blogSlug}`;
  const logoUrl = `${ROOT_URL}${require('../static/og-image.jpg')}`;
  const breadcrumbs = getBreadrumbs(blogSlug, post.title.length ? post.title[0].text : 'Article');
  return (
    <React.Fragment>
      <BlogMeta post={post} />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <article className="blogPost">
        <h1>{post.title.length ? post.title[0].text : ''}</h1>
        {/* Here we pass our rich text field to Prismics RichText renderer, along with our linkResolver */}
        {RichText.render(post.body, linkResolver)}
        {post.body1[0] && post.body1[0].primary.text ? RichText.render(post.body1[0].primary.text, linkResolver) : null}
      </article>
      <style jsx>{`
        .blogPost {
          margin: 10px auto 20px;
          padding: 0 13px;
          line-height: 1.4;
        }

        ul,
        .left-align {
          text-align: left;
        }

        .link {
          text-decoration: none;
          outline: none;
        }

        @media (max-width: 768px) {
          .blogPost {
            font-size: 14px;
          }
        }
      `}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={addArticleLD(post, info, postUrl, logoUrl)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addBreadcrumbsLD(blogSlug, post.title.length ? post.title[0].text : 'Article')}
      />
    </React.Fragment>
  );
};

BlogPost.getInitialProps = async context => {
  const { slug, breadcrumbs } = context.query;
  const response = await getBlogPostAPI(slug);
  return {
    post: response,
    breadcrumbs
  };
};

BlogPost.propTypes = {
  post: PropTypes.object.isRequired
};

export default BlogPost;
