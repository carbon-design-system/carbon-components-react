import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from './Link';

class OrderSummary extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...other } = this.props;
    const classes = classNames('bx--order-summary', className);

    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}

class OrderSummaryHeader extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string,
  };

  render() {
    const { children, className, title, ...other } = this.props;
    const classes = classNames('bx--order-header', className);

    return (
      <section className={classes} {...other}>
        <p className="bx--order-header-title">{title}</p>
        {children}
      </section>
    );
  }
}

class OrderSummaryList extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...other } = this.props;
    const classes = classNames('bx--order-list', className);

    return (
      <ul className={classes} {...other}>
        {children}
      </ul>
    );
  }
}

class OrderSummaryListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    text: PropTypes.string,
    price: PropTypes.string,
  };

  render() {
    const { children, className, text, price, ...other } = this.props;
    const classes = classNames('bx--order-item', className);

    return (
      <li className={classes} {...other}>
        <p className="bx--order-detail">{text}</p>
        <p className="bx--order-price">{price}</p>
      </li>
    );
  }
}

class OrderSummaryTotal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    summaryText: PropTypes.string,
    summaryPrice: PropTypes.string,
    summaryDetails: PropTypes.string,
  };

  render() {
    const {
      children,
      className,
      summaryText,
      summaryPrice,
      summaryDetails,
      ...other
    } = this.props;
    const classes = classNames('bx--order-total-container', className);

    return (
      <section className={classes} {...other}>
        <div className="bx--order-total">
          <p className="bx--order-total-text">{summaryText}</p>
          <p className="bx--order-total-price">
            {summaryPrice}
            <span>{summaryDetails}</span>
          </p>
        </div>
        {children}
      </section>
    );
  }
}

class OrderSummaryFooter extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const {
      children,
      className,
      footerText,
      linkText,
      href,
      ...other
    } = this.props;
    const classes = classNames('bx--order-footer', className);

    return (
      <section className={classes} {...other}>
        <p className="bx--order-footer-text">{footerText}</p>
        &nbsp;
        <Link href={href}>{linkText}</Link>
      </section>
    );
  }
}

export {
  OrderSummary,
  OrderSummaryHeader,
  OrderSummaryList,
  OrderSummaryListItem,
  OrderSummaryTotal,
  OrderSummaryFooter,
};
