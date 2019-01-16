import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';
import { linkResolver } from '~/lib/prismic';
import classes from './FeaturedArticle.scss';

const FeaturedArticle = props => {
  const date = moment(new Date(props.post.data.date_published)).format('D MMMM');
  const blogPostUrl = linkResolver(props.post);
  return (
    <div className="wrapper">
      <Link prefetch as={blogPostUrl} href={`/blogPost?slug=${props.post.uid}`}>
        <a title={props.post.data.images.alt}>
          <picture>
            <source srcSet={props.post.data.images.url} type="image/webp" />
            <img className="featuredImage" src={props.post.data.images_fallback.url} alt={props.post.data.images.alt} />
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
        <Link prefetch as={blogPostUrl} href={`/blogPost?slug=${props.post.uid}`}>
          <a className="readMore" title="Read more">
            <strong>Read more</strong>
          </a>
        </Link>
      </div>
      <style jsx>{classes}</style>
    </div>
  );
};

FeaturedArticle.propTypes = {
  post: PropTypes.object.isRequired
};

export default FeaturedArticle;
