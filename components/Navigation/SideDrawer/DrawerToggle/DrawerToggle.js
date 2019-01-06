import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.scss';

const DrawerToggle = props => (
  <div className="drawlerToggle" onClick={props.clicked}>
    <span />
    <span />
    <span />
    <style jsx>{classes}</style>
  </div>
);

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default DrawerToggle;
