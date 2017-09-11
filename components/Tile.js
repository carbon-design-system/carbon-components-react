import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './Icon';

class Tile extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, ...other } = this.props;

    return (
      <div className="bx--tile" {...other}>
        {children}
      </div>
    );
  }
}

class ClickableTile extends Component {
  state = {
    clicked: false
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    href: PropTypes.string,
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  handleKeyDown = evt => {
    if (evt.which === 13 || evt.which === 32) {
      this.setState({
        clicked: !this.state.clicked
      });
    }
  }

  render() {
    const { children, href, ...other } = this.props;
    const { clicked } = this.state;

    const classes = classNames('bx--tile', 'bx--tile--clickable', {
      'bx--tile--is-clicked': clicked
    });

    return (
      <a href={href} className={classes} {...other} onClick={this.handleClick} onKeyDown={this.handleKeyDown}>
        {children}
      </a>
    );
  }
}

class SelectableTile extends Component {
  state = {
    selected: this.props.selected
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    selected: PropTypes.bool,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
  };

  static defaultProps = {
    value: 'value',
    title: 'title',
    selected: false
  };

  handleClick = evt => {
    const isInput = evt.target === this.input;
    if (!isInput) {
      this.setState({
        selected: !this.state.selected
      });
    }
  }

  handleKeyDown = evt => {
    if (evt.which === 13 || evt.which === 32) {
      this.setState({
        selected: !this.state.selected
      });
    }
  }

  render() {
    const { children, id, tabIndex, value, name, title, ...other } = this.props;

    const classes = classNames('bx--tile', 'bx--tile--selectable', {
      'bx--tile--is-selected': this.state.selected
    });

    return (
      <label htmlFor={id} className={classes} tabIndex={tabIndex} {...other} onClick={this.handleClick} onKeyDown={this.handleKeyDown}>
        <input ref={input => { this.input = input; }} tabIndex={-1} id={id} className="bx--tile-input" value={value} type="checkbox" name={name} title={title} checked={this.state.selected} />
        <div className="bx--tile__checkmark">
          <Icon name="checkmark--glyph" description="Tile checkmark" />
        </div>
        <div className="bx--tile-content">
          {children}
        </div>
      </label>
    );
  }
}

class ExpandableTile extends Component {
  state = {
    expanded: false,
    tileMaxHeight: '0'
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    expanded: PropTypes.bool,
    tabIndex: PropTypes.number
  };

  static defaultProps = {
    tabIndex: 0
  }

  componentDidMount = () => {
    this.aboveTheFold = ReactDOM.findDOMNode(this.refs[0]); // eslint-disable-line
    this.setState({
      tileMaxHeight: this.aboveTheFold.getBoundingClientRect().height
    })
  }

  setMaxHeight = () => {
    if (this.state.expanded) {
      this.setState({
        tileMaxHeight: this.tileContent.getBoundingClientRect().height
      });
    } else {
      this.setState({
        tileMaxHeight: this.aboveTheFold.getBoundingClientRect().height
      });
    }
  }

  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded
    }, () => {
      this.setMaxHeight();
    });
  }

  getChildren = () => {
    return React.Children.map(this.props.children, child => child);
  }

  render() {
    const { tabIndex, ...other } = this.props;
    const { expanded } = this.state;

    const classes = classNames('bx--tile', 'bx--tile--expandable', {
      'bx--tile--is-expanded': expanded
    });
    const tileStyle = {
      'maxHeight': this.state.tileMaxHeight
    };
    const content = this.getChildren().map((child, index) => {
      return React.cloneElement(child, { ref: index });
    });
    return (
      <div
        ref={tile => { this.tile = tile; }}
        style={tileStyle}
        className={classes}
        {...other}
        role="button"
        onClick={this.handleClick}
        tabIndex={tabIndex}
      >
        <button className="bx--tile__chevron">
          <Icon name="chevron--down" description="Tile chevron" />
        </button>
        <div ref={tileContent => { this.tileContent = tileContent; }} className="bx--tile-content">
          {content}
        </div>
      </div>
    );
  }
}

class TileAboveTheFoldContent extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  render() {
    const { children } = this.props;

    return (
      <span className="bx--tile-content__above-the-fold">
        {children}
      </span>
    )
  }
}

class TileBelowTheFoldContent extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  render() {
    const { children } = this.props;

    return (
      <span className="bx--tile-content__below-the-fold">
        {children}
      </span>
    )
  }
}

export {
  Tile,
  ClickableTile,
  SelectableTile,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent
};
