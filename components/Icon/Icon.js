import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classes from './Icon.scss';

const getIconProps = type =>
  ({
    facebook: {
      url: 'https://www.facebook.com/valentingblog',
      alt: 'Facebook icon',
      title: 'Follow us on Facebook',
      src: require('../../public/social/facebook.svg')
    },
    youtube: {
      url: 'https://youtube.com',
      alt: 'YouTube icon',
      title: 'Follow us on YouTube',
      src: require('../../public/social/youtube.svg')
    },
    gplus: {
      url: 'https://plus.google.com/b/101578086239762371964/101578086239762371964',
      alt: 'Google Plus icon',
      title: 'Follow us on Google Plus',
      src: require('../../public/social/googleplus.svg')
    },
    twitter: {
      url: 'https://twitter.com',
      alt: 'Twitter icon',
      title: 'Follow us on Twitter',
      src: require('../../public/social/twitter.svg')
    },
    instagram: {
      url: 'https://instagram.com',
      alt: 'Instagram icon',
      title: 'Follow us on Instagram',
      src: require('../../public/social/instagram.svg')
    }
  }[type]);

const Icon = props => {
  const { url, title, alt, src } = getIconProps(props.type);
  return (
    <>
      <a href={url} title={title} target="_blank" rel="noopener">
        <img className="socialIcon" src={src} alt={alt} />
      </a>
      <style jsx scoped>{classes}</style>
    </>
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired
};
export default React.memo(Icon);
