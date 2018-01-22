import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import classNames from 'classnames';
import FloatingMenu from '../../internal/FloatingMenu';
import ClickListener from '../../internal/ClickListener';

export default class Tooltip extends Component {
  static propTypes = {
    /**
     * The ID of the trigger button.
     */
    triggerId: PropTypes.string,

    /**
     * The ID of the tooltip content.
     */
    tooltipId: PropTypes.string,
    open: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    direction: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
    menuOffset: PropTypes.object,
    triggerText: PropTypes.string,
    showIcon: PropTypes.bool,
    iconName: PropTypes.string,
    iconDescription: PropTypes.string,
    clickToOpen: PropTypes.bool,
  };

  static defaultProps = {
    open: false,
    direction: 'bottom',
    showIcon: true,
    iconName: 'info--glyph',
    iconDescription: 'tooltip',
    triggerText: 'Provide triggerText',
    menuOffset: {},
  };

  state = {
    open: this.props.open,
  };

  componentDidMount() {
    requestAnimationFrame(() => {
      this.getTriggerPosition();
    });
  }

  getTriggerPosition = () => {
    if (this.triggerEl) {
      const triggerPosition = this.triggerEl.getBoundingClientRect();
      this.setState({ triggerPosition });
    }
  };

  handleMouse = state => {
    if (this.props.clickToOpen) {
      if (state === 'click') {
        this.setState({ open: !this.state.open });
      }
    } else {
      if (state === 'over') {
        this.getTriggerPosition();
        this.setState({ open: true });
      } else {
        this.setState({ open: false });
      }
    }
  };

  handleClickOutside = () => {
    this.setState({ open: false });
  };

  handleKeyPress = evt => {
    const key = evt.key || evt.which;

    if (key === 'Enter' || key === 13 || key === ' ' || key === 32) {
      this.setState({ open: !this.state.open });
    }
  };

  render() {
    const {
      triggerId = (this.triggerId =
        this.triggerId ||
        `__carbon-tooltip-trigger_${Math.random()
          .toString(36)
          .substr(2)}`),
      tooltipId = (this.tooltipId =
        this.tooltipId ||
        `__carbon-tooltip_${Math.random()
          .toString(36)
          .substr(2)}`),
      children,
      className,
      direction,
      triggerText,
      showIcon,
      iconName,
      iconDescription,
      menuOffset,
      ...other
    } = this.props;

    const { open } = this.state;

    const tooltipClasses = classNames(
      'bx--tooltip',
      { 'bx--tooltip--shown': open },
      className
    );

    return (
      <div>
        <ClickListener onClickOutside={this.handleClickOutside}>
          {showIcon ? (
            <div className="bx--tooltip__trigger">
              {triggerText}
              <div
                id={triggerId}
                ref={node => {
                  this.triggerEl = node;
                }}
                onMouseOver={() => this.handleMouse('over')}
                onMouseOut={() => this.handleMouse('out')}
                onFocus={() => this.handleMouse('over')}
                onBlur={() => this.handleMouse('out')}
                aria-haspopup="true"
                aria-owns={tooltipId}
                aria-expanded={open}>
                <Icon
                  onKeyDown={this.handleKeyPress}
                  onClick={() => this.handleMouse('click')}
                  role="button"
                  tabIndex="0"
                  name={iconName}
                  description={iconDescription}
                />
              </div>
            </div>
          ) : (
            <div
              id={triggerId}
              className="bx--tooltip__trigger"
              ref={node => {
                this.triggerEl = node;
              }}
              onMouseOver={() => this.handleMouse('over')}
              onMouseOut={() => this.handleMouse('out')}
              onFocus={() => this.handleMouse('over')}
              onBlur={() => this.handleMouse('out')}
              aria-haspopup="true"
              aria-owns={tooltipId}
              aria-expanded={open}>
              {triggerText}
            </div>
          )}
        </ClickListener>
        <FloatingMenu
          menuPosition={this.state.triggerPosition}
          menuDirection={direction}
          menuOffset={menuOffset}>
          <div
            id={tooltipId}
            className={tooltipClasses}
            {...other}
            data-floating-menu-direction={direction}
            aria-labelledby={triggerId}>
            {children}
          </div>
        </FloatingMenu>
      </div>
    );
  }
}
