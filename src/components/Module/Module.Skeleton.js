import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const ModuleSkeleton = ({ size }) => {
  const wrapperClasses = classNames(
    'bx--module',
    'bx--skeleton',
    `bx--module--${size}`
  );
  return (
    <div className={wrapperClasses}>
      <div className="bx--module__inner">
        <div className="bx--module__header">
          <h1 className="bx--module__title">&nbsp;</h1>
        </div>
        <div className="bx--module__content" />
      </div>
    </div>
  );
};

ModuleSkeleton.propTypes = {
  size: PropTypes.oneOf(['single', 'double']),
};

ModuleSkeleton.defaultProps = {
  size: 'double',
};

export default ModuleSkeleton;
