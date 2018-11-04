import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Close = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32">
    <path d="M17.414 16L24 9.414 22.586 8 16 14.586 9.414 8 8 9.414 14.586 16 8 22.586 9.414 24 16 17.414 22.586 24 24 22.586 17.414 16z" />
  </svg>
);

const ChevronRight = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32">
    <path d="M22 16L12 26l-1.414-1.414L19.172 16l-8.586-8.586L12 6l10 10z" />
  </svg>
);

const translations = {
  'carbon.sidenav.state.open': 'Close the side navigation menu',
  'carbon.sidenav.state.closed': 'Open the side navigation menu',
};

function translateById(id) {
  return translations[id];
}

export default class SideNav extends React.Component {
  static propTypes = {
    /**
     * Optionally provide a custom class to apply to the underlying <li> node
     */
    className: PropTypes.string,

    /**
     * Provide a custom function for translating all message ids within this
     * component. This function will take in two arguments: the mesasge Id and the
     * state of the component. From this, you should return a string representing
     * the label you want displayed or read by screen readers.
     */
    translateById: PropTypes.func,
  };

  static defaultProps = {
    translateById,
  };

  state = {
    isExpanded: true,
  };

  handleExpand = () => {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  };

  render() {
    const {
      children,
      className: customClassName,
      translateById: t,
    } = this.props;
    const { isExpanded } = this.state;
    const assistiveText = isExpanded
      ? t('carbon.sidenav.state.open')
      : t('carbon.sidenav.state.closed');
    const className = cx({
      'bx--side-nav': true,
      'bx--side-nav--expanded': isExpanded,
      [customClassName]: !!customClassName,
    });

    // Variants
    // Header -> with menu, without menu, with long title, with normal title
    // Items
    // Link with no icon, active/non-active
    // Link with icon, active/non-active
    // Menu with icon, non-collapsible, active/non-active child link
    // Menu with icon, collapsible, active/non-active child link
    // Menu without icon, non-collapsible, active/non-active child link
    // Menu without icon, collapsible, active/non-active child link
    // Sections
    // Side nav with items that trigger overflow
    // Side nav with typical items
    // Side nav footer section (fixed?)
    // Each item with a lot of text
    // Text with RTL support?

    return (
      <aside className={className}>
        <nav
          className="bx--side-nav__navigation"
          role="navigation"
          aria-label="Side navigation">
          <header className="bx--side-nav__header">
            <div className="bx--side-nav__icon">
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true">
                <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
              </svg>
            </div>
            <div className="bx--side-nav__details">
              <h2
                className="bx--side-nav__title"
                title="Really long title here that should trigger an overflow">
                Really long title here that should trigger an overflow
              </h2>
              <div className="bx--side-nav__switcher">
                <label for="side-nav-switcher" className="bx--assistive-text">
                  Switcher
                </label>
                <select
                  id="side-nav-switcher"
                  className="bx--side-nav__select"
                  name="Switcher"
                  defaultValue="">
                  <option
                    className="bx--side-nav__option"
                    disabled
                    hidden
                    value="">
                    Really long value that probably should be truncated
                  </option>
                  <option className="bx--side-nav__option" value="Option 1">
                    Option 1
                  </option>
                  <option className="bx--side-nav__option" value="Option 2">
                    Option 2
                  </option>
                  <option className="bx--side-nav__option" value="Option 3">
                    Option 3
                  </option>
                </select>
                <div className="bx--side-nav__switcher-chevron">
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
            </div>
          </header>
          <ul className="bx--side-nav__items">
            <li className="bx--side-nav__item">
              <a className="bx--side-nav__link" href="javascript:void(0)">
                <div className="bx--side-nav__icon bx--side-nav__icon--small">
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true">
                    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
                  </svg>
                </div>
                <span className="bx--side-nav__link-text">Link</span>
              </a>
            </li>
            <li className="bx--side-nav__item">
              <button
                className="bx--side-nav__submenu"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                <div className="bx--side-nav__icon">
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true">
                    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
                  </svg>
                </div>
                <span className="bx--side-nav__submenu-title">
                  Category title that is really long and probably should
                  overflow
                </span>
                <div className="bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron">
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32">
                    <path d="M16 22L6 12l1.414-1.414L16 19.172l8.586-8.586L26 12 16 22z" />
                  </svg>
                </div>
              </button>
              <ul className="bx--side-nav__menu" role="menu" hidden>
                <li className="bx--side-nav__menu-item" role="none">
                  <a
                    className="bx--side-nav__link"
                    href="javascript:void(0)"
                    role="menuitem">
                    Link
                  </a>
                </li>
                <li className="bx--side-nav__menu-item" role="none">
                  <a
                    className="bx--side-nav__link"
                    href="javascript:void(0)"
                    role="menuitem">
                    Link
                  </a>
                </li>
                <li
                  className="bx--side-nav__menu-item"
                  role="none"
                  role="menuitem">
                  <a className="bx--side-nav__link" href="javascript:void(0)">
                    Link
                  </a>
                </li>
              </ul>
            </li>
            <li className="bx--side-nav__item bx--side-nav__item--active">
              <button
                className="bx--side-nav__submenu"
                role="button"
                aria-haspopup="true"
                aria-expanded="true">
                <div className="bx--side-nav__icon">
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true">
                    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
                  </svg>
                </div>
                <span className="bx--side-nav__submenu-title">
                  Category title that is really long and probably should
                  overflow
                </span>
                <div className="bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron">
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32">
                    <path d="M16 22L6 12l1.414-1.414L16 19.172l8.586-8.586L26 12 16 22z" />
                  </svg>
                </div>
              </button>
              <ul className="bx--side-nav__menu" role="menu">
                <li className="bx--side-nav__menu-item" role="none">
                  <a
                    className="bx--side-nav__link"
                    href="javascript:void(0)"
                    role="menuitem">
                    <span className="bx--side-nav__link-text">
                      Link with really long text that probably should be
                      truncated
                    </span>
                  </a>
                </li>
                <li className="bx--side-nav__menu-item" role="none">
                  <a
                    className="bx--side-nav__link"
                    href="javascript:void(0)"
                    role="menuitem"
                    aria-current="page">
                    <span className="bx--side-nav__link-text">
                      Link with really long text that probably should be
                      truncated
                    </span>
                  </a>
                </li>
                <li className="bx--side-nav__menu-item" role="none">
                  <a
                    className="bx--side-nav__link"
                    href="javascript:void(0)"
                    role="menuitem">
                    <span className="bx--side-nav__link-text">Link</span>
                  </a>
                </li>
                <li className="bx--side-nav__menu-item" role="none">
                  <a
                    className="bx--side-nav__link"
                    href="javascript:void(0)"
                    role="menuitem"
                    aria-current="page">
                    <span className="bx--side-nav__link-text">Link</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="bx--side-nav__item">
              <a className="bx--side-nav__link" href="javascript:void(0)">
                <div className="bx--side-nav__icon bx--side-nav__icon--small">
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true">
                    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
                  </svg>
                </div>
                <span className="bx--side-nav__link-text">Link</span>
              </a>
            </li>
          </ul>
          <footer className="bx--side-nav__footer">
            <button
              className="bx--side-nav__toggle"
              role="button"
              onClick={this.handleExpand}
              title={assistiveText}>
              <div className="bx--side-nav__icon">
                {isExpanded ? (
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32">
                    <path d="M17.414 16L24 9.414 22.586 8 16 14.586 9.414 8 8 9.414 14.586 16 8 22.586 9.414 24 16 17.414 22.586 24 24 22.586 17.414 16z" />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32">
                    <path d="M22 16L12 26l-1.414-1.414L19.172 16l-8.586-8.586L12 6l10 10z" />
                  </svg>
                )}
              </div>

              <span className="bx--assistive-text">
                Toggle the expansion state of the navigation
              </span>
            </button>
          </footer>
        </nav>
      </aside>
    );
  }
}
