import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classes from './NavigationItem.scss';

const NavigationItem = props => (
  <React.Fragment>
    <li className="menuItem">
      <Link as={props.as} href={props.to}>
        <a className="menuLink" title={props.title}>
          {props.children}
        </a>
      </Link>
    </li>
    <style jsx>{classes}</style>
  </React.Fragment>
);

NavigationItem.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  as: PropTypes.string,
  children: PropTypes.string.isRequired
};

export default NavigationItem;
