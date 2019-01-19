import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const getContactdata = type => {
  let href = null;
  let title = null;
  let text = null;

  switch (type) {
    case 'terms':
      href = '/terms';
      title = 'Terms';
      text = 'Terms';
      break;
    case 'privacy':
      href = '/privacy';
      title = 'Privacy and Cookie Policy';
      text = 'Privacy & Cookie Policy';
      break;
    case 'sitemap':
      href = '/sitemap.xml';
      title = 'Site Map';
      text = 'Site Map';
      break;

    default:
      break;
  }

  return { href, title, text };
};

const FooterLink = props => {
  const { href, title, text } = getContactdata(props.type);
  return (
    <li className="footerLink">
      <Link href={href} as={props.as}>
        <a className="footerLinkItem" title={title}>
          {text}
        </a>
      </Link>
    </li>
  );
};

FooterLink.propTypes = {
  type: PropTypes.string.isRequired,
  as: PropTypes.string
};

export default FooterLink;
