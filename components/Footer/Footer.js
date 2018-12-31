import React from 'react';

import classes from './Footer.scss';

import FooterTop from './FooterTop/FooterTop';
import FooterBottom from './FooterBottom/FooterBottom';

const newsLetterFormHandler = event => {
  event.preventDefault();
};

const footer = () => (
  <footer className={classes.footer}>
    <FooterTop newsLetterFormHandler={newsLetterFormHandler} />
    <FooterBottom />
  </footer>
);

export default footer;
