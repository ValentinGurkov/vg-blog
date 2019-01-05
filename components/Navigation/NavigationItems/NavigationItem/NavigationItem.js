import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classes from './NavigationItem.scss';

const NavigationItem = props => (
  <li className="menuItem">
    <Link as={props.as} href={props.to} prefetch>
      <a className="menuLink" title={props.title}>
        {props.children}
      </a>
    </Link>
    <style jsx>{classes}</style>
  </li>
);

NavigationItem.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  as: PropTypes.string,
  children: PropTypes.string.isRequired
};

export default NavigationItem;
