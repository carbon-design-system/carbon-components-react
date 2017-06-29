import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import uid from "../lib/uniqueId";

class StructuredListWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    border: PropTypes.bool,
    selection: PropTypes.bool
  };

  static defaultProps = {
    border: false,
    selection: false
  };

  render() {
    const { children, selection, className, border, ...other } = this.props;

    const classes = classNames("bx--structured-list", className, {
      "bx--structured-list--border": border,
      "bx--structured-list--selection": selection
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
    className: PropTypes.string
  };

  render() {
    const { children, className, ...other } = this.props;

    const classes = classNames("bx--structured-list-thead", className);
    return <div className={classes} {...other}>{children}</div>;
  }
}

class StructuredListInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {},
    type: "radio"
  };

  componentWillMount() {
    this.uid = this.props.id || uid();
  }

  // handleChange = evt => {
  //   this.props.onChange(this.props.value, this.props.name, evt);
  // };

  render() {
    const { className, type, value, name, title, ...other } = this.props;
    const classes = classNames("bx--structured-list-input", className);
    return (
      <input
        {...other}
        type={type}
        // onChange={this.handleChange}
        tabIndex={-1}
        id={this.uid}
        className={classes}
        value={value}
        name={name}
        title={title}
      />
    );
  }
}

class StructuredListRow extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    value: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    head: PropTypes.bool,
    label: PropTypes.bool,
    input: PropTypes.bool,
    htmlFor: PropTypes.string,
    tabIndex: PropTypes.number,
    onKeyDown: PropTypes.func
  };

  static defaultProps = {
    htmlFor: "unique id",
    head: false,
    label: false,
    input: false,
    tabIndex: 0,
    onKeyDown: () => {}
  };

  render() {
    const {
      onKeyDown,
      tabIndex,
      htmlFor,
      children,
      className,
      head,
      label,
      input,
      value,
      title,
      name,
      ...other
    } = this.props;

    const classes = classNames("bx--structured-list-row", className, {
      "bx--structured-list-row--header-row": head
    });

    return label
      ? <label
          {...other}
          tabIndex={tabIndex}
          className={classes}
          htmlFor={htmlFor}
          onKeyDown={onKeyDown}
        >
          {input
            ? <StructuredListInput
                id={htmlFor}
                value={value}
                title={title}
                name={name}
              />
            : null}
          {children}
        </label>
      : <div {...other} className={classes}>
          {children}
        </div>;
  }
}

class StructuredListBody extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    head: PropTypes.bool,
    onKeyDown: PropTypes.func
  };

  static defaultProps = {
    onKeyDown: () => {}
  };

  state = {
    labelRows: null,
    rowSelected: 0
  };

  handleKeyDown = evt => {
    console.log("handleKeyDown");
    this.props.onKeyDown(evt);
  };

  render() {
    const { children, className, ...other } = this.props;
    const childrenWithProps = React.Children.map(children, child => {
      return child.type === StructuredListRow
        ? React.cloneElement(child, {
            onKeyDown: this.handleKeyDown
          })
        : child;
    });
    const classes = classNames("bx--structured-list-tbody", className);
    return <div className={classes} {...other}>{childrenWithProps}</div>;
  }
}

class StructuredListCell extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    head: PropTypes.bool,
    noWrap: PropTypes.bool
  };

  static defaultProps = {
    head: false,
    noWrap: false
  };

  render() {
    const { children, className, head, noWrap, ...other } = this.props;

    const classes = classNames(className, {
      "bx--structured-list-th": head,
      "bx--structured-list-td": !head,
      "bx--structured-list-content--nowrap": noWrap
    });

    return <div className={classes} {...other}>{children}</div>;
  }
}

export {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell
};
