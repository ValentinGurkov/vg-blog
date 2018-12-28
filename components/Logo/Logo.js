import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classes from './Logo.scss';

const Logo = props => (
  <div className={props.footer ? classes.footerLogo : classes.logo}>
    <Link prefetch href="/">
      <a title="Home">
        <img width="40px" height="40px" src={props.src} alt="Logo" />
      </a>
    </Link>
  </div>
);

Logo.propTypes = {
  footer: PropTypes.bool,
  src: PropTypes.string.isRequired
};

export default Logo;
