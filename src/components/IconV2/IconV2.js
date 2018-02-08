import PropTypes from 'prop-types';
import React from 'react';

/**
 * @param {Object} svgData - JSON Object for an SVG icon
 * @returns {ReactElement} Elements/Nodes for SVG
 * @example
 * // Returns SVG elements
 * const svgData = getSvgData('copy-code');
 * svgShapes(svgData);
 */
export function svgShapes(svgData) {
  const svgElements = Object.keys(svgData)
    .filter(key => svgData[key])
    .map(svgProp => {
      const data = svgData[svgProp];

      if (svgProp === 'circles') {
        return data.map((circle, index) => {
          const circleProps = {
            cx: circle.cx,
            cy: circle.cy,
            r: circle.r,
            key: `circle${index}`,
          };

          return <circle {...circleProps} />;
        });
      } else if (svgProp === 'paths') {
        return data.map((path, index) => (
          <path d={path.d} key={`key${index}`} />
        ));
      }

      return '';
    });

  return svgElements;
}

const IconV2 = ({
  className,
  description,
  fill,
  fillRule,
  height,
  role,
  style,
  width,
  icon,
  ...other
}) => {
  const props = {
    className,
    fill,
    fillRule,
    height: height || icon.height,
    role,
    style,
    viewBox: icon.viewBox,
    width: width || icon.width,
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

IconV2.propTypes = {
  /**
   * The icon data.
   */
  icon: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    viewBox: PropTypes.string.isRequired,
    svgData: PropTypes.object.isRequired,
  }).isRequired,

  /**
   * The CSS class name.
   */
  className: PropTypes.string,

  /**
   * The CSS style.
   */
  style: PropTypes.object,

  /**
   * The content in SVG `<title>` element.
   */
  description: PropTypes.string.isRequired,

  /**
   * The SVG `fill` attribute.
   */
  fill: PropTypes.string,

  /**
   * The SVG `fill-rule` attribute.
   */
  fillRule: PropTypes.string,

  /**
   * The width of the icon.
   */
  width: PropTypes.string,

  /**
   * The height of the icon.
   */
  height: PropTypes.string,

  /**
   * The `role` attribute.
   */

  role: PropTypes.string,
};

IconV2.defaultProps = {
  fillRule: 'evenodd',
  role: 'img',
  description: 'Provide a description that will be used as the title',
};

export default IconV2;
