import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const ListBox = ({
  type = 'default',
  innerRef,
  children,
  className: containerClassName,
}) => {
  const className = cx(containerClassName, {
    'bx--list-box': true,
    'bx--list-box--inline': type === 'inline',
  });
  return (
    <div className={className} ref={innerRef}>
      {children}
    </div>
  );
};

ListBox.propTypes = {
  type: PropTypes.oneOf(['default', 'inline']),
  innerRef: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ListBox;
