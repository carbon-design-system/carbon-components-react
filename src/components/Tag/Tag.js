import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

const TYPES = {
  beta: 'Beta',
  community: 'Community',
  custom: 'Custom',
  dedicated: 'Dedicated',
  experimental: 'Experimental',
  ibm: 'IBM',
  local: 'Local',
  private: 'Private',
  functional: 'Functional',
  'third-party': 'Third-Party',
};

export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      removed: false,
    };
  }
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
    isRemovable: PropTypes.bool,
    onRemove: PropTypes.func,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    onRemove: () => {},
    onSelect: () => {},
    isRemovable: false,
  };

  toggleSelect = event => {
    const { onSelect, children } = this.props;
    const newState = !this.state.selected;

    this.setState({
      selected: newState,
    });

    event.stopPropagation();
    if (onSelect) {
      onSelect({ children: children, isSelected: newState });
    }
  };

  handleRemove = event => {
    const { onRemove, children } = this.props;
    event.stopPropagation();
    this.setState({
      removed: true,
    });

    if (onRemove) {
      onRemove(children);
    }
  };

  render() {
    const {
      children,
      className,
      type,
      isRemovable,
      onRemove, // eslint-disable-line no-unused-vars
      onSelect, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;
    let tagClass = `bx--tag--${type}`;
    let tagClasses = classNames(
      'bx--tag',
      tagClass,
      {
        'bx--tag--functional__selected': this.state.selected,
        'bx--tag__removed': this.state.removed,
      },
      className
    );

    let tagProps = {
      className: tagClasses,
      ...other,
    };
    if (TYPES[type] === 'Functional') {
      tagProps = {
        ...tagProps,
        className: tagClasses,
        tabIndex: 0,
        onClick: this.toggleSelect,
        onKeyDown: evt => {
          if (evt.which === 13 || evt.which === 32) this.toggleSelect(evt);
        },
      };
    }

    const closeIcon = (
      <span className="bx--tag-spacing">
        <Icon
          className="bx--tag-close"
          name="close"
          role="button"
          tabIndex="0"
          onClick={this.handleRemove}
          onKeyDown={evt => {
            if (evt.which === 13 || evt.which === 32) this.handleRemove(evt);
          }}
        />
      </span>
    );

    return (
      <span {...tagProps} style={{ cursor: 'default' }}>
        {children || TYPES[type]}
        {isRemovable && closeIcon}
      </span>
    );
  }
}

export const types = Object.keys(TYPES);
