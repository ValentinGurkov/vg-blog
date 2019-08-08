import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './Breadcrumbs.scss';

const Breadcrumbs = props => (
  <div className="breadcrumbElements">
    {props.breadcrumbs.map((crumb, index) => (
      <span key={index} className="breadcrumbElement">
        <Link href={crumb.url}>
          <a title={`Go to ${crumb.page}`}>
            <span>{crumb.page}</span>
          </a>
        </Link>
      </span>
    ))}
    <style jsx>{styles}</style>
  </div>
);

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.array.isRequired
};

export default React.memo(Breadcrumbs);
