import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classes from './Icon.scss';

const getIconProps = type =>
  ({
    facebook: {
      url: 'https://www.facebook.com',
      alt: 'Facebook icon',
      title: 'Follow us on Facebook',
      src: '/static/social/facebook.svg'
    },
    youtube: {
      url: 'https://youtube.com',
      alt: 'YouTube icon',
      title: 'Follow us on YouTube',
      src: '/static/social/youtube.svg'
    },
    gplus: {
      url: 'https://plus.google.com/discover',
      alt: 'Google Plus icon',
      title: 'Follow us on Google Plus',
      src: '/static/social/googleplus.svg'
    },
    twitter: {
      url: 'https://twitter.com',
      alt: 'Twitter icon',
      title: 'Follow us on Twitter',
      src: '/static/social/twitter.svg'
    },
    instagram: {
      url: 'https://instagram.com',
      alt: 'Instagram icon',
      title: 'Follow us on Instagram',
      src: '/static/social/instagram.svg'
    }
  }[type]);

const Icon = props => {
  const { url, title, alt, src } = getIconProps(props.type);
  return (
    <Link href={url}>
      <a title={title} target="_blank" rel="noopener">
        <img className={classes.socialIcon} src={src} alt={alt} />
      </a>
    </Link>
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired
};
export default Icon;
