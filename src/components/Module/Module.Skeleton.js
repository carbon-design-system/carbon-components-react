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
    <div class={wrapperClasses}>
      <div class="bx--module__inner">
        <div class="bx--module__header">
          <h1 class="bx--module__title">&nbsp;</h1>
        </div>
        <div class="bx--module__content" />
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
