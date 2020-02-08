import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { linkResolver } from '~/lib/prismic';
import { formatArticleDate } from '~/server/util';
import classes from './FeaturedArticle.scss';

const FeaturedArticle = props => {
  const date = formatArticleDate(new Date(props.post.data.date_published));
  const blogPostUrl = linkResolver(props.post);
  return (
    <div className="wrapper">
      <Link as={blogPostUrl} href={`/blogPost?slug=${props.post.uid}`}>
        <a title={props.post.data.images.alt}>
          <picture>
            <source media="(min-width: 768px)" srcSet={props.post.data.images.url} type="image/webp" />
            <source media="(min-width: 768px)" srcSet={props.post.data.images_fallback.url} type="image/jpeg" />
            <source srcSet={props.post.data.images.mobile.url} type="image/webp" />
            <img
              className="featuredImage"
              src={props.post.data.images_fallback.mobile.url}
              alt={props.post.data.images.alt}
            />
          </picture>
        </a>
      </Link>
      <div className="articleDescription">
        <p className="smallTitle">
          <span className="featured">Featued post</span>
          <span className="date">{date}</span>
        </p>
        <h1 className="mediumTitle">{props.post.data.title[0].text}</h1>
        <p className="shortDescription">{props.post.data.og_description[0].text}</p>
        <Link as={blogPostUrl} href={`/blogPost?slug=${props.post.uid}`}>
          <a className="readMore" title="Read more">
            <strong>Read more</strong>
          </a>
        </Link>
      </div>
      <style jsx scoped>{classes}</style>
    </div>
  );
};

FeaturedArticle.propTypes = {
  post: PropTypes.object.isRequired
};

export default React.memo(FeaturedArticle);
