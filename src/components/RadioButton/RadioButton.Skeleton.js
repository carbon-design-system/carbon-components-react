import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';
export default class RadioButtonSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className={styles['radioButtonWrapper']}>
        <div
          className={classNames(
            styles['bx--radio-button'],
            styles['bx--skeleton']
          )}
        />
        {
          /* eslint-disable jsx-a11y/label-has-for */
          <label
            className={classNames(
              styles['bx--radio-button__label'],
              styles['bx--skeleton']
            )}
            htmlFor={id}
          />
        }
      </div>
    );
  }
}
