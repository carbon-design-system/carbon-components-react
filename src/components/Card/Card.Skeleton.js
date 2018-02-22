import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import SkeletonText from '../SkeletonText';

const CardSkeleton = ({ children, className, ...other }) => {
  const cardClasses = classNames({
    'bx--card': true,
    'bx--skeleton': true,
    [className]: className,
  });

  return (
    <div {...other} className={cardClasses}>
      {children}
      <div className="bx--card__card-overview">
        <SkeletonText heading width="45%" />
        <SkeletonText width="70%" />
      </div>
      <div className="bx--card-footer" />
    </div>
  );
};

CardSkeleton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CardSkeleton;
