/**
 * @param {Function} propType The original prop type checker.
 * @param {string[]} names Other possible property names that should exist.
 * @returns {Function}
 *   The new prop type checker that checks if one of the given props exist,
 *   in addition to the one being checked.
 */
export default function isRequiredThisOrOneOf(propType, names) {
  return function(props, propName, componentName, ...rest) {
    if (
      __DEV__ &&
      !props[propName] &&
      names.every(name => !props.hasOwnProperty(name))
    ) {
      return new Error(
        `${componentName} requires one of the following props: ${[
          propName,
          ...names,
        ].join(', ')}`
      );
    }
    return propType(props, propName, componentName, ...rest);
  };
}
