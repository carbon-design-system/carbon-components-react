import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import CopyButton from '../CopyButton';

const CodeSnippet = ({
  className,
  type,
  children,
  copyProps,
  onClick,
  wrappedContentRef,
  ...other
}) => {
  const snippetType =
    type === 'terminal' ? 'bx--snippet--terminal' : 'bx--snippet--code';
  const wrapperClasses = classNames('bx--snippet', className, snippetType);
  const localCopyProps = { ...copyProps };
  if (onClick) localCopyProps.onClick = onClick;
  return (
    <div className={wrapperClasses} {...other}>
      <div role="textbox" tabIndex={0} className="bx--snippet-container">
        <code>
          <pre ref={wrappedContentRef}>{children}</pre>
        </code>
      </div>
      <CopyButton {...localCopyProps} />
    </div>
  );
};

CodeSnippet.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
  /** props for the CopyButton component */
  copyProps: PropTypes.object,
  /** onClick function for the CopyButton. For legacy usage only. Please use copyProps instead. */
  onClick: PropTypes.func,
  wrappedContentRef: PropTypes.func,
};

CodeSnippet.defaultProps = {
  type: 'terminal',
};

export default CodeSnippet;
