import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classes from './Logo.scss';

const Logo = props => {
  const src = props.footer ? require('../../public/footer-logo.svg') : require('../../public/logo.svg');
  return (
    <div className="logo">
      <Link href="/">
        <a title="Home">
          <img width="40px" height="40px" src={src} alt="Logo" />
        </a>
      </Link>
      <style jsx scoped>{classes}</style>
    </div>
  );
};

Logo.propTypes = {
  footer: PropTypes.bool
};

export default React.memo(Logo);
