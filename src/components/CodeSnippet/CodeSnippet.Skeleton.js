import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

export default class CodeSnippetSkeleton extends Component {
  static propTypes = {
    /**
     * The type of code snippet
     * can be single or multi
     */
    type: PropTypes.oneOf(['single', 'multi']),
    className: PropTypes.string,
  };

  static defaultProps = {
    type: 'single',
  };

  render() {
    const { className, type, ...other } = this.props;

    const codeSnippetClasses = classNames(className, {
      [styles['bx--snippet']]: true,
      [styles['bx--skeleton']]: true,
      [styles['bx--snippet--single']]: type === 'single',
      [styles['bx--snippet--multi']]: type === 'multi',
    });

    if (type === 'single') {
      return (
        <div className={codeSnippetClasses} {...other}>
          <div className={styles['bx--snippet-container']}>
            <span />
          </div>
        </div>
      );
    }

    if (type === 'multi') {
      return (
        <div className={codeSnippetClasses} {...other}>
          <div className={styles['bx--snippet-container']}>
            <span />
            <span />
            <span />
          </div>
        </div>
      );
    }
  }
}
