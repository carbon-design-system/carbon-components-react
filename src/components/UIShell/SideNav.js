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
    return (
      <aside className={className}>
        <div className="bx--side-nav__content">
          {children}
          <footer className="bx--side-nav__footer">
            <button
              className="bx--side-nav__toggle"
              onClick={this.handleExpand}
              title={assistiveText}
              type="button">
              <div className="bx--side-nav__icon">
                {isExpanded ? <Close /> : <ChevronRight />}
              </div>
              <span className="bx--assistive-text">{assistiveText}</span>
            </button>
          </footer>
        </div>
      </aside>
    );
  }
}
