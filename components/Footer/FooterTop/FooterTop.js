import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classes from './FooterTop.scss';
import Icon from '~/components/Icon/Icon';

const FooterTop = props => (
  <div className={classes.footerTop}>
    <div className={classes.newsLetter}>
      <p className={classes.footerHeading}>Newsletter</p>
      <p className={classes.footerParagraph}>Sign up for our newsletter to be notified about the latest blog posts</p>
      <form>
        <input type="email" className={classes.footerInput} placeholder="Enter your email address" />
        <button className={classes.footerButton} type="submit" value="Join now" onClick={props.newsLetterFormHandler}>
          <span>JOIN NOW</span>
        </button>
      </form>
    </div>
    <div className={classes.contact}>
      <p className={classes.footerHeading}>Contact us</p>
      <ul className={classes.contactList}>
        <li className={classes.contactLink}>
          <Link href="mailto:me@me.com">
            <a>Email:&nbsp;wme@me.come.com</a>
          </Link>
        </li>
        <li className={classes.contactLink}>
          <Link href="tel:+47 56519808">
            <a>Phone:&nbsp;+47 56519808</a>
          </Link>
        </li>
        <li className={classes.contactLink}>
          <p>Time: 09:00 - 15:00</p>
        </li>
      </ul>
    </div>
    <div className={classes.followUs}>
      <p className={classes.footerHeading}>Follow us</p>
      <div className={classes.socialIcons}>
        <Icon type="facebook" />
        <Icon type="gplus" />
        <Icon type="twitter" />
        <Icon type="instagram" />
        <Icon type="youtube" />
      </div>
    </div>
  </div>
);

FooterTop.propTypes = {
  newsLetterFormHandler: PropTypes.func.isRequired
};

export default FooterTop;
