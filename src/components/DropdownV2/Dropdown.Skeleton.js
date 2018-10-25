import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const DropdownSkeleton = ({ inline }) => {
  const wrapperClasses = classNames({
    [styles['bx--skeleton']]: true,
    [styles['bx--dropdown-v2']]: true,
    [styles['bx--list-box']]: true,
    [styles['bx--form-item']]: true,
    [styles['bx--list-box--inline']]: inline,
  });
  return (
    <div className={wrapperClasses}>
      <div role="button" className={styles['bx--list-box__field']}>
        <span className={styles['bx--list-box__label']} />
      </div>
    </div>
  );
};

DropdownSkeleton.propTypes = {
  inline: PropTypes.bool,
};

DropdownSkeleton.defaultProps = {
  inline: false,
};

export default DropdownSkeleton;
