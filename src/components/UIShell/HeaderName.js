import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { name } from './classNames';

const HeaderName = ({
  children,
  className: customClassName,
  prefix,
  href,
  ...rest
}) => {
  const className = cx(name.name, customClassName);
  return (
    <a {...rest} className={className} href={href}>
      {prefix && <>{prefix}&nbsp;</>}
      <span className={name.platform}>{children}</span>
    </a>
  );
};

HeaderName.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  prefix: PropTypes.string,
  href: PropTypes.string.isRequired,
};

HeaderName.defaultProps = {
  prefix: 'IBM',
};

export default HeaderName;
