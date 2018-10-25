import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

export default class CheckboxSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div
        className={classNames(
          styles['bx--form-item'],
          styles['bx--checkbox-wrapper']
        )}>
        {
          // eslint-disable-next-line jsx-a11y/label-has-for
          <label
            className={classNames(
              styles['bx--checkbox-label'],
              styles['bx--checkbox-label']
            )}
            htmlFor={id}
          />
        }
      </div>
    );
  }
}
