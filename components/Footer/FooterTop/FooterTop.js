import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classes from './FooterTop.scss';
import Icon from '~/components/Icon/Icon';

const FooterTop = props => (
  <div className="footerTop">
    <div className="newsLetter">
      <p className="footerHeading">Newsletter</p>
      <p className="footerParagraph">Sign up for our newsletter to be notified about the latest blog posts</p>
      <form>
        <input type="email" className="footerInput" placeholder="Enter your email address" />
        <button className="footerButton" type="submit" value="Join now" onClick={props.newsLetterFormHandler}>
          <span>Join now</span>
        </button>
      </form>
    </div>
    <div className="contact">
      <p className="footerHeading">Contact us</p>
      <ul className="contactList">
        <li className="contactLink">
          <Link href="mailto:me@me.com">
            <a>Email:&nbsp;wme@me.come.com</a>
          </Link>
        </li>
        <li className="contactLink">
          <Link href="tel:+47 56519808">
            <a>Phone:&nbsp;+47 56519808</a>
          </Link>
        </li>
        <li className="contactLink">
          <p>Time: 09:00 - 15:00</p>
        </li>
      </ul>
    </div>
    <div className="followUs">
      <p className="footerHeading">Follow us</p>
      <div className="socialIcons">
        <Icon type="facebook" />
        <Icon type="gplus" />
        <Icon type="twitter" />
        <Icon type="instagram" />
        <Icon type="youtube" />
      </div>
    </div>
    <style jsx>{classes}</style>
  </div>
);

FooterTop.propTypes = {
  newsLetterFormHandler: PropTypes.func.isRequired
};

export default FooterTop;
