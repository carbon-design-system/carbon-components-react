import { Children } from 'react';
import invariant from 'invariant';
import createChainableTypeChecker from './tools/createChainableTypeChecker';
import getDisplayName from './tools/getDisplayName';
import areComponentsEqual from './tools/areComponentsEqual';

/**
 * `childrenOfType` is used for asserting that children of a given React
 * component are only of a given type. Currently, this supports React elements,
 * Stateless Functional Components, Class-based components and Proxied
 * Components.
 *
 * This prop validator also supports chaining through `isRequired`
 */
const childrenOfType = expectedChildType => {
  const expectedDisplayName = getDisplayName(
    // Support both React elements and components by using `type` if it exists
    expectedChildType.type || expectedChildType
  );
  const validate = (props, propName, componentName) => {
    Children.forEach(props[propName], child => {
      const childType = child.type;
      const childDisplayName = getDisplayName(childType);
      invariant(
        areComponentsEqual(childType, expectedChildType) ||
        areComponentsEqual(childType, expectedChildType.type),
        `Invalid prop \`children\` of type \`${childDisplayName}\` ` +
        `supplied to \`${componentName}\`, expected each child to be a ` +
        `\`${expectedDisplayName}\` component.`
      );
    });
  };

  return createChainableTypeChecker(validate);
};

export default childrenOfType;
