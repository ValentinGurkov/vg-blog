import React from 'react';
import Link from 'next/link';
import Logo from '~/components/Logo/Logo';
import classes from './FooterBottom.scss';

const FooterBottom = () => (
  <div className="footerBottom">
    <div className="footerLogo">
      <Logo footer src={require('../../../static/footer-logo.svg')} />
    </div>
    <span className="copyright">&copy; 2018 Valentin Gurkov</span>
    <nav>
      <ul className="footerNav">
        <li className="footerLink">
          <Link prefetch href="/terms" as="terms-and-conditions">
            <a className="footerLinkItem" title="Terms">
              Terms
            </a>
          </Link>
        </li>
        <li className="footerLink">
          <Link prefetch href="/privacy" as="/privacy-policy">
            <a className="footerLinkItem" title="Privacy and Cookie Policy">
              Privacy & Cookie Policy
            </a>
          </Link>
        </li>
        <li className="footerLink">
          <Link prefetch href="/sitemap.xml">
            <a className="footerLinkItem" title="Site Map">
              Site Map
            </a>
          </Link>
        </li>
      </ul>
    </nav>
    <style jsx>{classes}</style>
  </div>
);
export default FooterBottom;
