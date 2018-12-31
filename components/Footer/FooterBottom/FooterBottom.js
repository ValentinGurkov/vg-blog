import React from 'react';
import Link from 'next/link';
import Logo from '~/components/Logo/Logo';
import classes from './FooterBottom.scss';

const FooterBottom = () => (
  <div className={classes.footerBottom}>
    <div className={classes.footerLogo}>
      <Logo footer src="/static/footer-logo.svg" />
    </div>
    <span className={classes.copyright}>&copy; 2018 Valentin Gurkov</span>
    <nav>
      <ul className={classes.footerNav}>
        <li className={classes.footerLink}>
          <Link prefetch href="/terms" as="terms-and-conditions">
            <a className={classes.footerLinkItem} title="Terms">
              Terms
            </a>
          </Link>
        </li>
        <li className={classes.footerLink}>
          <Link prefetch href="/privacy" as="/privacy-policy">
            <a className={classes.footerLinkItem} title="Privacy and Cookie Policy">
              Privacy & Cookie Policy
            </a>
          </Link>
        </li>
        <li className={classes.footerLink}>
          <Link prefetch href="/sitemap.xml">
            <a className={classes.footerLinkItem} title="Site Map">
              Site Map
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);
export default FooterBottom;
