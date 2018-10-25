import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

export default class TagSkeleton extends React.Component {
  render() {
    return (
      <span className={classNames(styles['bx--tag'], styles['bx--skeleton'])} />
    );
  }
}
