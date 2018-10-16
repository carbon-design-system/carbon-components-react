import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

// TODO: styling support for just rendering the name
const PlatformHeaderName = ({
  children,
  className: customClassName,
  company,
  platform,
  href,
  ...rest
}) => {
  const className = cx('bx--platform-header__name', customClassName);
  return (
    <a {...rest} className={className} href={href}>
      {company}{' '}
      <span className="bx--platform-header__platform-name">{platform}</span>
    </a>
  );
};

PlatformHeaderName.propTypes = {
  className: PropTypes.string,
  company: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

PlatformHeaderName.defaultProps = {
  company: 'IBM',
  href: '/',
};

export default PlatformHeaderName;
