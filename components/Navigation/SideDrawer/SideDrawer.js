import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.scss';

const SideDrawer = props => {
  let attachedClasses;
  if (props.open) {
    attachedClasses = [classes.sideDrawer, classes.open].join(' ');
  } else {
    attachedClasses = [classes.sideDrawer, classes.close].join(' ');
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <nav className={attachedClasses}>
        <NavigationItems />
      </nav>
    </>
  );
};

SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired
};

export default SideDrawer;
