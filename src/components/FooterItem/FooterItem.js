/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const FooterItem = ({ link, label, className, ...other }) => {
  const footerItemClassnames = classnames(
    `${prefix}--footer-info__item`,
    className
  );

  return (
    <div {...other} className={footerItemClassnames}>
      <p className={`${prefix}--footer-label`}>{label}</p>
      {link}
    </div>
  );
};

FooterItem.propTypes = {
  /**
   * Provide a Link or custom anchor element to render
   */
  link: PropTypes.node.isRequired,

  /**
   * Provide a label to be displayed with the link
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide a custom className to be applied to the item
   */
  className: PropTypes.string,
};

export default FooterItem;
