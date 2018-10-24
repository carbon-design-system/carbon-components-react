import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { ChevronDownGlyph } from '@carbon/icons-react';
import isRequiredOneOf from '../../prop-types/isRequiredOneOf';

class PlatformHeaderNavMenu extends React.Component {
  static propTypes = {
    ...isRequiredOneOf({
      ariaLabel: PropTypes.string,
      ariaLabelledBy: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.menuItem = React.createRef();
  }

  handleOnExpand = () => {
    this.setState({
      expanded: true,
    });
  };

  handleOnMouseOver = () => {
    this.setState({
      expanded: true,
    });
  };

  handleOnMouseOut = () => {
    this.setState({
      expanded: false,
    });
  };

  handleOnKeyDown = event => {
    // Run if Spacebar (32) or Enter (13) are pressed
    if (event.keyCode === 32 || event.keyCode === 13) {
      this.setState(
        {
          expanded: true,
        },
        () => {
          this.menuItem.current.focus();
        }
      );
    }
  };

  render() {
    const {
      ariaLabel,
      ariaLabelledBy,
      children,
      className: customClassName,
      forwardedRef,
      title,
      ...rest
    } = this.props;
    const className = cx('bx--platform-header__submenu', customClassName);
    const accessibilityLabel = {};
    if (ariaLabel) {
      accessibilityLabel['aria-label'] = ariaLabel;
    } else if (ariaLabelledBy) {
      accessibilityLabel['aria-labelledby'] = ariaLabelledBy;
    }

    return (
      <li
        {...rest}
        className={className}
        onMouseOver={this.handleOnMouseOver}
        onMouseOut={this.handleOnMouseOut}>
        <a
          className="bx--platform-header__menu-item bx--platform-header__menu-title"
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={this.state.expanded}
          href="javascript:void(0)"
          ref={forwardedRef}
          onKeyDown={this.handleOnKeyDown}>
          {title}
          <ChevronDownGlyph className="bx--platform-header__menu-arrow" />
        </a>
        <ul
          className="bx--platform-header__menu"
          role="menu"
          {...accessibilityLabel}>
          {React.Children.map(children, (child, index) => {
            if (index === 0) {
              return React.cloneElement(child, {
                tabIndex: 0,
                ref: this.menuItem,
              });
            }
            return React.cloneElement(child, {
              tabIndex: -1,
            });
          })}
        </ul>
      </li>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <PlatformHeaderNavMenu {...props} forwardedRef={ref} />
));
