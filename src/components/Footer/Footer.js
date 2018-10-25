import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Link from '../Link';
import Button from '../Button';
import styles from '../../../.storybook/_container.scss';

const Footer = ({
  className,
  children,
  labelOne,
  linkTextOne,
  linkHrefOne,
  labelTwo,
  linkTextTwo,
  linkHrefTwo,
  buttonText,
  ...other
}) => {
  const classNames = classnames(
    styles['bx--footer'],
    styles['bx--footer--bottom-fixed'],
    className
  );

  const footer = children ? (
    <footer {...other} className={classNames}>
      {children}
    </footer>
  ) : (
    <footer {...other} className={classNames}>
      <div className={styles['bx--footer-info']}>
        <div className={styles['bx--footer-info__item']}>
          <p className={styles['bx--footer-label']}>{labelOne}</p>
          <Link href={linkHrefOne}>{linkTextOne}</Link>
        </div>
        <div className={styles['bx--footer-info__item']}>
          <p className={styles['bx--footer-label']}>{labelTwo}</p>
          <Link href={linkHrefTwo}>{linkTextTwo}</Link>
        </div>
      </div>
      <div className={styles['bx--footer-cta']}>
        <Button type="submit">{buttonText}</Button>
      </div>
    </footer>
  );

  return footer;
};

Footer.propTypes = {
  /**
   * Provide children to be rendered instead of the default footer information
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing <footer> node
   */
  className: PropTypes.string,

  /**
   * Provide the label for the first footer information item
   */
  labelOne: PropTypes.string,

  /**
   * Provide the text for the first footer information item
   */
  linkTextOne: PropTypes.string,

  /**
   * Provide the href attribute for the first footer information item
   */
  linkHrefOne: PropTypes.string,

  /**
   * Provide the label for the second footer information item
   */
  labelTwo: PropTypes.string,

  /**
   * Provide the text for the second footer information item
   */
  linkTextTwo: PropTypes.string,

  /**
   * Provide the href for the second footer information item
   */
  linkHrefTwo: PropTypes.string,

  /**
   * Provide the text for the footer button
   */
  buttonText: PropTypes.string,
};

Footer.defaultProps = {
  labelOne: 'Need Help?',
  linkTextOne: 'Contact Bluemix Sales',
  linkHrefOne: '#',
  labelTwo: 'Estimate Monthly Cost',
  linkTextTwo: 'Cost Calculator',
  linkHrefTwo: '#',
  buttonText: 'Create',
};

export default Footer;
