import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classes from './ContactLink.scss';

const getContactdata = type => {
  let href = null;
  let title = null;
  let text = null;

  switch (type) {
    case 'email':
      href = 'mailto:me@me.com';
      title = 'Email us';
      text = 'Email: wme@me.come.com';
      break;
    case 'phone':
      href = 'tel:+47 56519808';
      title = 'Call us';
      text = 'Phone: +47 56519808';
      break;
    default:
      break;
  }

  return { href, title, text };
};

const ContactLink = props => {
  const { href, title, text } = getContactdata(props.type);
  return (
    <li className="contactLink">
      <Link href={href}>
        <a title={title}>{text}</a>
      </Link>
      <style jsx>{classes}</style>
    </li>
  );
};

ContactLink.propTypes = {
  type: PropTypes.string.isRequired
};

export default ContactLink;
