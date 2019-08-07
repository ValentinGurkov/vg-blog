import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { linkResolver } from '~/lib/prismic';
import { formatArticleDate } from '~/server/util';
import classes from './ArticleThumb.scss';

const ArticleThumb = props => {
  const date = formatArticleDate(new Date(props.post.data.date_published));
  return (
    <li className="article">
      <Link as={linkResolver(props.post)} href={`/blogPost?slug=${props.post.uid}`}>
        <a title={props.post.data.images.thumbnail.alt}>
          <picture>
            <source media="(min-width: 768px)" srcSet={props.post.data.images.thumbnail.url} type="image/webp" />
            <source
              media="(min-width: 768px)"
              srcSet={props.post.data.images_fallback.thumbnail.url}
              type="image/jpeg"
            />
            <source srcSet={props.post.data.images.mobile.url} type="image/webp" />
            <img
              className="articleImage"
              src={props.post.data.images_fallback.mobile.url}
              alt={props.post.data.images.alt}
            />
          </picture>
        </a>
      </Link>
      <p className="smallTitle">
        <span className="category">{props.post.data.category}</span>
        <span className="date">{date}</span>
      </p>
      <p className="title">
        <Link as={linkResolver(props.post)} href={`/blogPost?slug=${props.post.uid}`}>
          <a title={props.post.data.title[0].text}>{props.post.data.title[0].text}</a>
        </Link>
      </p>
      <p className="shortDescription">{props.post.data.og_description[0].text}</p>
      <Link as={linkResolver(props.post)} href={`/blogPost?slug=${props.post.uid}`}>
        <strong>
          <a className="readMore" title="Read more">
            Read more
          </a>
        </strong>
      </Link>
      <style jsx>{classes}</style>
    </li>
  );
};

ArticleThumb.propTypes = {
  post: PropTypes.object.isRequired
};

export default ArticleThumb;
