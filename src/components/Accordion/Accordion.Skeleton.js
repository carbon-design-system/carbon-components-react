import React from 'react';
import Icon from '../Icon';
import SkeletonText from '../SkeletonText';
import { iconChevronRight } from 'carbon-icons';
import classnames from 'classnames';
import styles from '../../../.storybook/_container.scss';

export default class AccordionSkeleton extends React.Component {
  render() {
    const item = (
      <li className={styles['bx--accordion__item']}>
        <button type="button" className={styles['bx--accordion__heading']}>
          <Icon
            className={styles['bx--accordion__arrow']}
            icon={iconChevronRight}
          />
          <SkeletonText className={styles['bx--accordion__title']} />
        </button>
      </li>
    );
    return (
      <ul
        className={classnames(styles['bx--accordion'], styles['bx--skeleton'])}>
        <li
          className={classnames(
            styles['bx--accordion__item'],
            styles['bx--accordion__item--active']
          )}>
          <button type="button" className={styles['bx--accordion__heading']}>
            <Icon
              className={styles['bx--accordion__arrow']}
              icon={iconChevronRight}
            />
            <SkeletonText className={styles['bx--accordion__title']} />
          </button>
          <div className={styles['bx--accordion__content']}>
            <SkeletonText width="90%" />
            <SkeletonText width="80%" />
            <SkeletonText width="95%" />
          </div>
        </li>
        {item}
        {item}
        {item}
      </ul>
    );
  }
}
