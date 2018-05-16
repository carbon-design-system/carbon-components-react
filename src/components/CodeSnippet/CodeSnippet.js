import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Copy from '../Copy';
import CopyButton from '../CopyButton';
import Icon from '../Icon';

export default class CodeSnippet extends Component {
  static propTypes = {
    /**
     * The type of code snippet
     * can be inline, single or multi
     */
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.string,
    feedback: PropTypes.string,
    copyLabel: PropTypes.string,
    onClick: PropTypes.func,
    wrappedContentRef: PropTypes.func,
    showMoreText: PropTypes.string,
    showLessText: PropTypes.string,
    /**
     * Used with inline snippet only
     * to display alternate color
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    type: 'single',
    showMoreText: 'Show more',
    showLessText: 'Show less',
  };

  state = {
    showBtn: false,
    expandedCode: false,
  };

  componentDidMount = () => {
    if (ReactDOM.findDOMNode(this).offsetHeight > 190) {
      this.setState({ showBtn: true });
    }
  };

  expandCode = () => {
    this.setState({ expandedCode: !this.state.expandedCode });
  };

  render() {
    const {
      className,
      type,
      children,
      feedback,
      onClick,
      copyLabel,
      wrappedContentRef,
      light,
      /*
      showMoreText,
      showLessText,
      */
      ...other
    } = this.props;

    const codeSnippetClasses = classNames(className, {
      'bx--snippet': true,
      'bx--snippet--single': type === 'single' || type === 'terminal',
      'bx--snippet--multi': type === 'multi' || type === 'code',
      'bx--snippet--inline': type === 'inline',
      'bx--snippet--expand': this.state.expandedCode,
      'bx--snippet--light': light,
    });

    const expandCodeBtnText = this.state.expandedCode ? 'less' : 'more'; // need the show/more less text props to show here

    const moreLessBtn = (
      <button
        className="bx--btn bx--btn--ghost bx--btn--sm bx--snippet-btn--expand"
        type="button"
        onClick={this.expandCode}>
        <span className="bx--snippet-btn--text">{expandCodeBtnText}</span>
        <Icon
          alt={expandCodeBtnText}
          name="chevron--down"
          description={expandCodeBtnText}
          className="bx--icon-chevron--down"
        />
      </button>
    );

    const code = (
      <div role="textbox" tabIndex={0} className="bx--snippet-container">
        <code>
          <pre ref={wrappedContentRef}>{children}</pre>
        </code>
      </div>
    );

    const copy = <CopyButton onClick={onClick} feedback={feedback} />;

    if (type === 'inline' || type === 'terminal') {
      return (
        <Copy
          className={codeSnippetClasses}
          aria-label={copyLabel}
          feedback={feedback}>
          <code>{children}</code>
        </Copy>
      );
    }

    if (type === 'single') {
      return (
        <div className={codeSnippetClasses} {...other}>
          {code}
          {copy}
        </div>
      );
    }

    if (type === 'multi' || (type === 'code' && !this.state.showBtn)) {
      return (
        <div className={codeSnippetClasses} {...other}>
          {code}
          {copy}
        </div>
      );
    }

    if (type === 'multi' || (type === 'code' && this.state.showBtn)) {
      return (
        <div className={codeSnippetClasses} {...other}>
          {code}
          {copy}
          {moreLessBtn}
        </div>
      );
    }
  }
}
