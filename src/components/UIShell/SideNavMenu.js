import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const SideNavMenu = ({ id, defaultValue, label, name, children, onChange }) => {
  return (
    <div className="bx--side-nav__sub-menu">
      <label htmlFor={id} className="bx--assistive-text">
        {label}
      </label>
      <select
        id={id}
        className="bx--side-nav__sub-menu__input"
        onChange={onChange}
        defaultValue={defaultValue}>
        <option
          className="bx--side-nav__sub-menu__option"
          value=""
          disabled
          hidden>
          {label}
        </option>
        {children}
      </select>
      <div className="bx--side-nav__sub-menu__arrow">
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32">
          <path d="M16 22L6 12l1.414-1.414L16 19.172l8.586-8.586L26 12 16 22z" />
        </svg>
      </div>
    </div>
  );
};

SideNavMenu.propTypes = {
  defaultValue: PropTypes.string,
  id: PropTypes.string,
};

SideNavMenu.defaultProps = {
  defaultValue: '',
  id: '__carbon-side-nav-title-bar-menu__',
};

export default SideNavMenu;
