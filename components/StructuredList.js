import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class StructuredListWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...other } = this.props;

    const classes = classNames('bx--structured-list', className);

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

class StructuredList extends Component {
  render() {
    return (
      <StructuredListWrapper>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>service</StructuredListCell>
            <StructuredListCell head>type</StructuredListCell>
            <StructuredListCell head>description</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell noWrap>
              Apache Spark
            </StructuredListCell>
            <StructuredListCell>IBM</StructuredListCell>
            <StructuredListCell>
              <p className="bx--structured-list-content">
                Apache Spark is an open source cluster computing framework optimized for
                extremely fast and large scale data processing,
                which you can access via the newly integrated notebook interface IBM Analytics
                for Apache Spark.
              </p>
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>
              Cloudant
            </StructuredListCell>
            <StructuredListCell>
              <p className="bx--structured-list-content">IBM</p>
            </StructuredListCell>
            <StructuredListCell>
              <p className="bx--structured-list-content">
                Cloudant NoSQL DB is a fully managed data layer designed for modern web and
                mobile applications that leverages a
                flexible JSON schema.
              </p>
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
    );
  }
}

export default StructuredList;
