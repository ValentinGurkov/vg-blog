import React from 'react';
import Link from 'next/link';

import classes from './Footer.scss';
import Logo from '../Logo/Logo';

const newsLetterFormHandler = event => {
  event.preventDefault();
};

const footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerTop}>
        <div className={classes.newsLetter}>
          <p className={classes.footerHeading}>Newsletter</p>
          <p className={classes.footerParagraph}>
            Sign up for our newsletter to be notified about the latest blog
            posts
          </p>
          <form onClick={newsLetterFormHandler}>
            <input
              type='email'
              className={classes.footerInput}
              placeholder='Enter your email address'
            />
            <button
              className={classes.footerButton}
              type='submit'
              value='Join now'>
              <span>JOIN NOW</span>
            </button>
          </form>
        </div>
        <div className={classes.contact}>
          <p className={classes.footerHeading}>Contact us</p>
          <ul className={classes.contactList}>
            <li className={classes.contactLink}>
              <Link href='mailto:me@me.com'>
                <a>Email:&nbsp;wme@me.come.com</a>
              </Link>
            </li>
            <li className={classes.contactLink}>
              <Link href='tel:+47 56519808'>
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
            <Link href='https://www.facebook.com'>
              <a title='Follow us on Facebook' target='_blank' rel='noopener'>
                <img
                  className={classes.socialIcon}
                  src='/static/social/facebook.svg'
                  alt='Facebook icon'
                />
              </a>
            </Link>
            <Link href='https://plus.google.com/discover'>
              <a title='Follow us on Google+' target='_blank' rel='noopener'>
                <img
                  className={classes.socialIcon}
                  src='/static/social/googleplus.svg'
                  alt='Google+ icon'
                />
              </a>
            </Link>
            <Link href='https://twitter.com'>
              <a title='Follow us on Twitter' target='_blank' rel='noopener'>
                <img
                  className={classes.socialIcon}
                  src='/static/social/twitter.svg'
                  alt='Twitter icon'
                />
              </a>
            </Link>
            <Link href='https://instagram.com'>
              <a title='Follow us on Instagram' target='_blank' rel='noopener'>
                <img
                  className={classes.socialIcon}
                  src='/static/social/instagram.svg'
                  alt='Instagram icon'
                />
              </a>
            </Link>
            <Link href='https://youtube.com'>
              <a title='Follow us on YouTube' target='_blank' rel='noopener'>
                <img
                  className={classes.socialIcon}
                  src='/static/social/youtube.svg'
                  alt='YouTube icon'
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.footerBottom}>
        <div className={classes.footerLogo}>
          <Logo footer src='/static/footer-logo.svg' />
        </div>
        <span className={classes.copyright}>&copy; 2018 Valentin Gurkov</span>
        <nav>
          <ul className={classes.footerNav}>
            <li className={classes.footerLink}>
              <Link href='/terms'>
                <a className={classes.footerLinkItem} title='Terms'>
                  Terms
                </a>
              </Link>
            </li>
            <li className={classes.footerLink}>
              <Link href='/privacyPolicy' as='/privacy-policy'>
                <a className={classes.footerLinkItem} title='Terms'>
                  Privacy & Cookie Policy
                </a>
              </Link>
            </li>
            <li className={classes.footerLink}>
              <Link href='/sitemap'>
                <a className={classes.footerLinkItem} title='Terms'>
                  Site Map
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default footer;
