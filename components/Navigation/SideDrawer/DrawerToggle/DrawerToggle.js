import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.scss';

const DrawerToggle = props => (
  <div className={classes.drawlerToggle} onClick={props.clicked}>
    <span />
    <span />
    <span />
  </div>
);

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default DrawerToggle;
