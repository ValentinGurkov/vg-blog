import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classes from './Logo.scss';

const Logo = props => (
  <div className={props.footer ? 'footerLogo' : 'logo'}>
    <Link prefetch href="/">
      <a title="Home">
        <img width="40px" height="40px" src={props.src} alt="Logo" />
      </a>
    </Link>
    <style jsx>{classes}</style>
  </div>
);

Logo.propTypes = {
  footer: PropTypes.bool,
  src: PropTypes.string.isRequired
};

export default Logo;
