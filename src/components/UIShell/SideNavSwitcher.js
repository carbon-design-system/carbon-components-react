import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// TODO: sync with @carbon/icons-react
const ChevronDown = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32">
    <path d="M16 22L6 12l1.414-1.414L16 19.172l8.586-8.586L26 12 16 22z" />
  </svg>
);

const SideNavSwitcher = ({
  className: customClassName,
  labelText,
  onChange,
  options,
}) => {
  const className = cx('bx--side-nav__switcher', customClassName);
  return (
    <div className={className}>
      <label for="side-nav-switcher" className="bx--assistive-text">
        {labelText}
      </label>
      <select
        id="side-nav-switcher"
        className="bx--side-nav__select"
        defaultValue=""
        onChange={onChange}>
        <option className="bx--side-nav__option" disabled hidden value="">
          {labelText}
        </option>
        {options.map(option => (
          <option key={option} className="bx--side-nav__option" value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="bx--side-nav__switcher-chevron">
        <ChevronDown />
      </div>
    </div>
  );
};

export default SideNavSwitcher;
