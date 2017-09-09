import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import window from 'window-or-global';

class DetailPageHeaderCustom extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    role: PropTypes.string,
    lockState: PropTypes.oneOf([
      'expanded',
      'collapsed',
      'unlocked',
    ]),
    isScrolled: PropTypes.bool,
    isScrollingDownward: PropTypes.bool,
    icon: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    top: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    bottom: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    side: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    extra: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  };

  static defaultProps = {
    className: '',
    title: 'Provide a title',
    role: 'banner', // a11y compliance
    icon: <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#D8D8D8" d="M0 0h24v24H0z" fillRule="evenodd" />
    </svg>,
    lockState: 'unlocked',
  };

  state = {
    isScrolled: false,
    isScrollingDownward: this.props.isScrollingDownward || false,
    lastPosition: 0,
  };

  componentDidMount() {
    this._debouncedScroll = debounce(this.handleScroll, 25);
    window.addEventListener('scroll', this._debouncedScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isScrolled !== this.props.isScrolled) {
      this.setState({ isScrolled: nextProps.isScrolled });
    }

    if (nextProps.isScrollingDownward !== this.props.isScrollingDownward) {
      this.setState({ isScrollingDownward: nextProps.isScrollingDownward });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._debouncedScroll);
  }

  handleScroll = () => {
    const { lastPosition } = this.state;

    const currentPosition = window.pageYOffset || 0;

    if (currentPosition > 86) {
      if (currentPosition > lastPosition) {
        this.setState({
          isScrolled: true,
          isScrollingDownward: true,
          lastPosition: currentPosition
        });
      } else {
        this.setState({
          isScrolled: true,
          isScrollingDownward: false,
          lastPosition: currentPosition
        });
      }
    } else {
      this.setState({
        isScrolled: false,
        isScrollingDownward: false,
        lastPosition: currentPosition
      });
    }
  };
  render() {
    const {
      className,
      title,
      icon,
      bottom,
      top,
      side,
      extra,
      lockState,
      ...other
    } = this.props;

    const { isScrolled, isScrollingDownward } = this.state;

    // const scrolled = isScrollingDownward ? 'bx--detail-page-header-custom--scroll' : null;

    const getExpansionState = (lockState, isScrollingDownward) => {
      switch (lockState) {
        case 'expanded':
          return null;
        case 'collapsed':
          return 'bx--detail-page-header-custom--collapsed';
        case 'unlocked':
          return isScrollingDownward ? 'bx--detail-page-header-custom--collapsed' : null;
      }
    };

    const expansionState = getExpansionState(lockState, isScrollingDownward);

    const classNames = classnames('bx--detail-page-header-custom', expansionState, className);

    const iconSection = icon ? (
      <div className="bx--detail-page-header-custom__icon-container">
        {icon}
      </div>
    ) : null;

    const topSection = top ? (
      <div className="bx--detail-page-header-custom__top">
        {top}
      </div>
    ) : null;

    const bottomSection = bottom ? (
      <div className="bx--detail-page-header-custom__bottom">
        {bottom}
      </div>
    ) : null;

    const extraSection = extra ? (
      <div className="bx--detail-page-header-custom__extra">
        {extra}
      </div>
    ) : null;

    const sideSection = side ? (
      <div className="bx--detail-page-header-custom__side">
        {side}
      </div>
    ) : null;

    return (
      <header {...other} className={classNames} data-header-active={isScrolled}>
        <div className="bx--detail-page-header-custom__content">
          {topSection}
          <div className="bx--detail-page-header-custom__middle">
            {iconSection}
            <h1 className="bx--detail-page-header-custom__title">{title}</h1>
            {extraSection}
          </div>
          {bottomSection}
        </div>
        {sideSection}
      </header>
    );
  }
}

export default DetailPageHeaderCustom;
