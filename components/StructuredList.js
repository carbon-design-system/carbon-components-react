import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uid from '../lib/uniqueId';

class StructuredListWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    border: PropTypes.bool,
    selection: PropTypes.bool,
  };

  static defaultProps = {
    border: false,
    selection: false,
  };

  render() {
    const { children, selection, className, border, ...other } = this.props;

    const classes = classNames('bx--structured-list', className, {
      'bx--structured-list--border': border,
      'bx--structured-list--selection': selection,
    });

    return (
      <section className={classes} {...other}>
        {children}
      </section>
    );
  }
}

class StructuredListHead extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...other } = this.props;

    const classes = classNames('bx--structured-list-thead', className);
    return <div className={classes} {...other}>{children}</div>;
  }
}

class StructuredListBody extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    head: PropTypes.bool,
  };
  render() {
    const { children, className, ...other } = this.props;
    const classes = classNames('bx--structured-list-tbody', className);
    return <div className={classes} {...other}>{children}</div>;
  }
}

class StructuredListRow extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    head: PropTypes.bool,
  };

  static defaultProps = {
    head: false,
  };

  render() {
    const { children, className, head, ...other } = this.props;

    const classes = classNames('bx--structured-list-row', className, {
      'bx--structured-list-row--header-row': head,
    });

    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}

class StructuredListRowSelection extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.node,
    id: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
  };

  static defaultProps = {
    checked: false,
  };

  componentWillMount() {
    this.uid = this.props.id || uid();
  }

  render() {
    const { checked, children, value, name, title } = this.props;

    return (
      <div>
        <input
          type="radio"
          tabIndex="-1"
          id={this.uid}
          className="bx--structured-list-input"
          value={value}
          name={name}
          title={title}
          checked={checked}
        />
        <label htmlFor={this.uid}>{children}</label>
      </div>
    );
  }
}

class StructuredListCell extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    head: PropTypes.bool,
    noWrap: PropTypes.bool,
  };

  static defaultProps = {
    head: false,
    noWrap: false,
  };

  render() {
    const { children, className, head, noWrap, ...other } = this.props;

    const classes = classNames(className, {
      'bx--structured-list-th': head,
      'bx--structured-list-td': !head,
      'bx--structured-list-content--nowrap': noWrap,
    });

    return <div className={classes} {...other}>{children}</div>;
  }
}

export {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListRowSelection,
  StructuredListCell,
};
