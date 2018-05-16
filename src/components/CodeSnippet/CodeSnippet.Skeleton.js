import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const CodeSnippetSkeleton = ({ className, type }) => {
  const snippetType =
    type === 'single' ? 'bx--snippet--single' : 'bx--snippet--multi';
  const wrapperClasses = classNames(
    'bx--snippet',
    'bx--skeleton',
    className,
    snippetType
  );
  return (
    <div className={wrapperClasses}>
      <div className="bx--snippet-container">
        <code>
          <pre />
        </code>
      </div>
    </div>
  );
};

CodeSnippetSkeleton.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

CodeSnippetSkeleton.defaultProps = {
  type: 'terminal',
};

export default CodeSnippetSkeleton;
