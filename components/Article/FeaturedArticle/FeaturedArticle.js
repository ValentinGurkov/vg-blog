import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';
import { linkResolver } from '../../../lib/prismic';
import classes from './FeaturedArticle.scss';

const FeaturedArticle = props => {
  const date = moment(new Date(props.post.data.date_published)).format('D MMMM');
  return (
    <div className={classes.wrapper}>
      <div>
        <Link as={linkResolver(props.post)} href={`/blogPost?slug=${props.post.uid}`}>
          <img src={props.post.data.images.url} alt={props.post.data.images.alt} />
        </Link>
      </div>
      <div>
        <p className={classes.smallTitle}>
          <span className={classes.featured}>Featued post</span>
          <span className={classes.date}>{date}</span>
        </p>
        <p className={classes.mediumTitle}>{props.post.data.title[0].text}</p>
        <p className={classes.shortDescription}>{props.post.data.og_description[0].text}</p>
        <Link as={linkResolver(props.post)} href={`/blogPost?slug=${props.post.uid}`}>
          <strong>
            <a className={classes.readMore} title='Read more'>
              Read more
            </a>
          </strong>
        </Link>
      </div>
    </div>
  );
};

FeaturedArticle.propTypes = {
  post: PropTypes.object.isRequired
};

export default FeaturedArticle;
