import PropTypes from 'prop-types';
import React from 'react';
import icons from 'carbon-icons';
import { svgShapes } from '../IconV2';

export { svgShapes };

/**
 * Returns a single icon Object
 * @param {string} name - "name" property of icon
 * @param {Object} [iconsObj=icons] - JSON Array of Objects
 * @example
 * // Returns a single icon Object
 * this.findIcon('copy-code', icons.json);
 */
export function findIcon(name, iconsObj = icons) {
  const icon = iconsObj.filter(obj => obj.name === name);

  if (icon.length === 0) {
    return false;
  } else if (icon.length > 1) {
    throw new Error('Multiple icons found...');
  } else {
    return icon[0];
  }
}

/**
 * Returns "svgData" Object
 * @param {string} iconName - "name" property of icon
 * @example
 * // Returns svgData Object for given iconName
 * this.getSvgData('copy-code');
 */
export function getSvgData(iconName) {
  const name = findIcon(iconName);
  return name ? name.svgData : false;
}

export function isPrefixed(name) {
  return name.split('--')[0] === 'icon';
}

const Icon = ({
  className,
  description,
  fill,
  fillRule,
  height,
  name,
  role,
  style,
  width,
  iconRef,
  ...other
}) => {
  const icon = isPrefixed(name) ? findIcon(name) : findIcon(`icon--${name}`);

  const props = {
    className,
    fill,
    fillRule,
    height: height || icon.height,
    name: isPrefixed ? name : `icon--${name}`,
    role,
    style,
    viewBox: icon.viewBox,
    width: width || icon.width,
    ref: iconRef,
    ...other,
  };

  const svgContent = icon ? svgShapes(icon.svgData) : '';

  return (
    <svg {...props} aria-label={description} alt={description}>
      <title>{description}</title>
      {svgContent}
    </svg>
  );
};

Icon.propTypes = {
  /**
   * The CSS class name.
   */
  className: PropTypes.string,

  /**
   * The icon description.
   */
  description: PropTypes.string.isRequired,

  /**
   * The `<svg>` `fill` attribute.
   */
  fill: PropTypes.string,

  /**
   * The `<svg>` `fillRule` attribute.
   */
  fillRule: PropTypes.string,

  /**
   * The `<svg>` `height` attribute.
   */
  height: PropTypes.string,

  /**
   * The name in the sprite.
   */
  name: PropTypes.string.isRequired,

  /**
   * The `role` attribute.
   */
  role: PropTypes.string,

  /**
   * The CSS styles.
   */
  style: PropTypes.object,

  /**
   * The `<svg>` `viewbox` attribute.
   */
  viewBox: PropTypes.string,

  /**
   * The `<svg>` `width` attribute.
   */
  width: PropTypes.string,

  /**
   * The `ref` callback for the icon.
   */
  iconRef: PropTypes.func,
};

Icon.defaultProps = {
  fillRule: 'evenodd',
  role: 'img',
  description: 'Provide a description that will be used as the title',
};

export { icons };
export default Icon;
