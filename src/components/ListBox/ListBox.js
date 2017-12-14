import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { ListBoxType } from './ListBoxPropTypes';

const ListBox = ({
  type,
  children,
  className: containerClassName,
  isDisabled,
  innerRef,
  ...rest
}) => {
  const className = cx('bx--list-box', containerClassName, {
    'bx--list-box--inline': type === 'inline',
    'bx--list-box--disabled': isDisabled,
  });
  return (
    <div className={className} ref={innerRef} {...rest}>
      {children}
    </div>
  );
};

ListBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  innerRef: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  type: ListBoxType.isRequired,
};

ListBox.defaultProps = {
  type: 'default',
};

export default ListBox;
