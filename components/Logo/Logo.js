import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classes from './Logo.scss';

const Logo = props => {
  const src = props.footer ? require('../../static/footer-logo.svg') : require('../../static/logo.svg');
  return (
    <div className="logo">
      <Link prefetch href="/">
        <a title="Home">
          <img width="40px" height="40px" src={src} alt="Logo" />
        </a>
      </Link>
      <style jsx>{classes}</style>
    </div>
  );
};

Logo.propTypes = {
  footer: PropTypes.bool
};

export default Logo;
