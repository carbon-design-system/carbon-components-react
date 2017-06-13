import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class StructuredListWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    border: PropTypes.bool,
  };

  static defaultProps = {
    border: true,
  };

  render() {
    const { children, className, border, ...other } = this.props;

    const classes = classNames('bx--structured-list', className, {
      'bx--structured-list--border': border,
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

class StructuredListContent extends Component {
  render() {
    const { children, className, ...other } = this.props;
    const classes = classNames('bx--structured-list-content', className);
    return <p className={classes} {...other}>{children}</p>;
  }
}

export {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListContent,
  StructuredListCell,
};
