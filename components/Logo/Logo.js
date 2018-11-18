import React from 'react';
import Link from 'next/link';
import classes from './Logo.scss';

const Logo = props => (
  <div className={props.footer ? classes.footerLogo : classes.logo}>
    <Link prefetch href='/'>
      <a title='Home'>
        <img src={props.src} alt='Logo' />
      </a>
    </Link>
  </div>
);

export default Logo;
