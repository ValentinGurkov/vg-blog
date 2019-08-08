import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.scss';

const Backdrop = props =>
  props.show ? (
    <React.Fragment>
      <div className="backdrop" onClick={props.clicked} /> <style jsx>{classes}</style>
    </React.Fragment>
  ) : null;

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired
};
export default React.memo(Backdrop);
