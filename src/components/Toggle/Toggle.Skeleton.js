import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

export default class ToggleSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className={styles['bx--form-item']}>
        <input
          type="checkbox"
          id={id}
          className={classNames(styles['bx--toggle'], styles['bx--skeleton'])}
        />

        <label
          className={styles['bx--toggle__label bx--skeleton']}
          htmlFor={id}>
          <span className={styles['bx--toggle__text--left']} />
          <span className={styles['bx--toggle__appearance']} />
          <span className={styles['bx--toggle__text--right']} />
        </label>
      </div>
    );
  }
}
