import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DropdownSkeleton = ({ inline, prefix }) => {
  const wrapperClasses = classNames({
    [`${prefix}--skeleton`]: true,
    [`${prefix}--dropdown-v2`]: true,
    [`${prefix}--list-box`]: true,
    [`${prefix}--form-item`]: true,
    [`${prefix}--list-box--inline`]: inline,
  });
  return (
    <div className={wrapperClasses}>
      <div role="button" className={`${prefix}--list-box__field`}>
        <span className={`${prefix}--list-box__label`} />
      </div>
    </div>
  );
};

DropdownSkeleton.propTypes = {
  /**
   * Specify whether you want the inline version of this control
   */
  inline: PropTypes.bool,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

DropdownSkeleton.defaultProps = {
  inline: false,
  prefix: 'bx',
};

export default DropdownSkeleton;
