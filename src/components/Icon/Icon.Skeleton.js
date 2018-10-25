import PropTypes from 'prop-types';
import React from 'react';
import styles from '../../../.storybook/_container.scss';

const IconSkeleton = ({ style }) => {
  const props = {
    style,
  };

  return <div className={styles['bx--icon--skeleton']} {...props} />;
};

IconSkeleton.propTypes = {
  /**
   * The CSS styles.
   */
  style: PropTypes.object,
};

export default IconSkeleton;
