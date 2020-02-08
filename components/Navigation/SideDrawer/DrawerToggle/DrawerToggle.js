import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.scss';

const DrawerToggle = props => (
  <div className="drawlerToggle" onClick={props.handleClicked}>
    <span />
    <span />
    <span />
    <style jsx scoped>{classes}</style>
  </div>
);

DrawerToggle.propTypes = {
  handleClicked: PropTypes.func.isRequired
};

export default React.memo(DrawerToggle);
