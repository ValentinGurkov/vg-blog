import React from 'react';

import classes from './Footer.scss';

import FooterTop from './FooterTop/FooterTop';
import FooterBottom from './FooterBottom/FooterBottom';

const handleNewsLetterForm = event => {
  event.preventDefault();
};

const footer = () => (
  <footer className="footer">
    <FooterTop handleNewsLetterForm={handleNewsLetterForm} />
    <FooterBottom />
    <style jsx>{classes}</style>
  </footer>
);

export default footer;
