import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import CopyButton from '../CopyButton';

const CodeSnippet = ({
  className,
  type,
  children,
  copyProps,
  wrappedContentRef,
  ...other
}) => {
  const snippetType =
    type === 'terminal' ? 'bx--snippet--terminal' : 'bx--snippet--code';
  const wrapperClasses = classNames('bx--snippet', className, snippetType);
  return (
    <div className={wrapperClasses} {...other}>
      <div role="textbox" tabIndex={0} className="bx--snippet-container">
        <code>
          <pre ref={wrappedContentRef}>{children}</pre>
        </code>
      </div>
      <CopyButton {...copyProps} />
    </div>
  );
};

CodeSnippet.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
  /** props for the CopyButton component */
  copyProps: PropTypes.object,
  wrappedContentRef: PropTypes.func,
};

CodeSnippet.defaultProps = {
  type: 'terminal',
};

export default CodeSnippet;
