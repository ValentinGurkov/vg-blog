import React from 'react';
import Logo from '~/components/Logo/Logo';
import classes from './FooterBottom.scss';
import FooterLink from './FooterLink/FooterLink';

const FooterBottom = () => (
  <div className="footerBottom">
    <div className="footerLogo">
      <Logo footer />
    </div>
    <span className="copyright">&copy; 2018 Valentin Gurkov</span>
    <nav>
      <ul className="footerNav">
        <FooterLink type="terms" as="/terms-and-conditions" />
        <FooterLink type="privacy" as="/privacy-policy" />
        <FooterLink type="sitemap" />
      </ul>
    </nav>
    <style jsx>{classes}</style>
  </div>
);
export default FooterBottom;
