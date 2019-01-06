import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';
import { linkResolver } from '~/lib/prismic';
import classes from './FeaturedArticle.scss';

const FeaturedArticle = props => {
  const date = moment(new Date(props.post.data.date_published)).format('D MMMM');
  return (
    <div className={classes.wrapper}>
      <Link prefetch as={linkResolver(props.post)} href={`/blogPost?slug=${props.post.uid}`}>
        <img className={classes.featuredImage} src={props.post.data.images.url} alt={props.post.data.images.alt} />
      </Link>
      <div className={classes.articleDescription}>
        <p className={classes.smallTitle}>
          <span className={classes.featured}>Featued post</span>
          <span className={classes.date}>{date}</span>
        </p>
        <p className={classes.mediumTitle}>{props.post.data.title[0].text}</p>
        <p className={classes.shortDescription}>{props.post.data.og_description[0].text}</p>
        <Link prefetch as={linkResolver(props.post)} href={`/blogPost?slug=${props.post.uid}`}>
          <p>
            <strong>
              <a className={classes.readMore} title="Read more">
                Read more
              </a>
            </strong>
          </p>
        </Link>
      </div>
    </div>
  );
};

FeaturedArticle.propTypes = {
  post: PropTypes.object.isRequired
};

export default FeaturedArticle;
