import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';
import { linkResolver } from '../../../lib/prismic';
import classes from './ArticleThumb.scss';

const ArticleThumb = props => {
  const date = moment(new Date(props.post.data.date_published)).format('D.M.YYYY');
  return (
    <li className="article">
      <Link prefetch as={linkResolver(props.post)} href={`/blogPost?slug=${props.post.uid}`}>
        <img
          className="articleImage"
          src={props.post.data.images.thumbnail.url}
          alt={props.post.data.images.thumbnail.alt}
        />
      </Link>
      <p className="smallTitle">
        <span className="category">{props.post.data.category}</span>
        <span className="date">{date}</span>
      </p>
      <p className="title">
        <Link prefetch as={linkResolver(props.post)} href={`/blogPost?slug=${props.post.uid}`}>
          <a title={props.post.data.title[0].text}>{props.post.data.title[0].text}</a>
        </Link>
      </p>
      <p className="shortDescription">{props.post.data.og_description[0].text}</p>
      <Link prefetch as={linkResolver(props.post)} href={`/blogPost?slug=${props.post.uid}`}>
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
