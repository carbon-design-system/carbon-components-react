import { Children } from 'react';
import createChainableTypeChecker from './tools/createChainableTypeChecker';
import getDisplayName from './tools/getDisplayName';

/**
 * `childrenOf` is used for asserting that the children of a given React
 * component are of a given set of types. Currently, this will work with types
 * that are Stateless Functional and Class-based components
 *
 * This prop validator also supports chaining through `isRequired`
 */
const childrenOf = expectedChildTypes => {
  // Support both React elements and components by using `type` if it exists
  const expectedDisplayNames = expectedChildTypes
    .map(child => getDisplayName(child.type || child))
    .join(', ');

  const validate = (props, propName, componentName) => {
    Children.forEach(props[propName], child => {
      if (!child) {
        return;
      }
      let childType = child.type;
      //TODO: think about this one
      if (
        child.type.hasOwnProperty('name') &&
        child.type.name !== getDisplayName(child.type) &&
        /proxyfacade/i.test(child.type.name) &&
        Object.prototype.hasOwnProperty.call(
          child.type,
          '__reactstandin__getCurrent'
        )
      ) {
        childType = child.type.__reactstandin__getCurrent();
      }
      const childDisplayName = getDisplayName(childType || child);
      if (!expectedChildTypes.includes(childType)) {
        throw new Error(
          `Invalid prop \`children\` of type \`${childDisplayName}\` ` +
            `supplied to \`${componentName}\`, expected each child to be one ` +
            `of: \`[${expectedDisplayNames}]\`.`
        );
      }
    });
  };

  return createChainableTypeChecker(validate);
};

export default childrenOf;
