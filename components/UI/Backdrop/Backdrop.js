import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.scss';

const Backdrop = props =>
  props.show ? (
    <>
      <div className="backdrop" onClick={props.handleClicked} /> <style jsx>{classes}</style>
    </>
  ) : null;

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClicked: PropTypes.func.isRequired
};
export default React.memo(Backdrop);
