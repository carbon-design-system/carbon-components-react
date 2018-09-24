'use strict';

/**
 * Compile time code replacement for babel similar to Webpack's `DefinePlugin`.
 * This replaces identifiers associated with named imports from Carbon React `featureFlags.js`,
 * whereas Webpack's `DefinePlugin` works with non-referenced identifiers.
 *
 * # .babelrc:
 *
 * {
 *   ...
 *   "plugins": [
 *     ...
 *     [
 *       "/path/to/babel-plugin-transform-carbon-feature-flags",
 *       {
 *         "flags": {
 *           "aFeatureFlag": true
 *         }
 *       }
 *     ],
 *   ],
 *   ...
 * }
 *
 * # In:
 *
 * import { aFeatureFlag } from '/path/to/featureFlags';
 * ...
 * const MyComponent = props => (<div {...props}>{aFeatureFlag ? 'foo' : 'bar'}</div>);
 *
 * # Out:
 *
 * import '/path/to/featureFlags';
 * ...
 * const MyComponent = props => (<div {...props}>{true ? 'foo' : 'bar'}</div>);
 */

module.exports = ({ types: t }) => ({
  name: 'transform-carbon-feature-flags',

  pre() {
    /**
     * The AST path of feature flags' named imports
     * whose references have been, or will be replaced with constants.
     * @type {Set}
     */
    this.namedImportPathsToBeRemoved = new Set();
  },

  visitor: {
    Identifier(path, { opts }) {
      const { flags = {}, testFeatureFlagsPath = /\/featureFlags$/i } = opts;
      const { node, parentPath, scope } = path;
      const { name } = node;
      const binding = scope.getBinding(name);
      if (binding && !t.isImportSpecifier(parentPath.node)) {
        const { path: bindingPath } = binding;
        const { node: specifier } = bindingPath;
        // Test if the definition of the identifier is a named import from `featureFlags.js`,
        // and the identifier is _not_ of the import statement itself.
        // If so, replace the identifier with a constant from the one in `flags` option,
        // and queue the named import definition for removal
        if (
          t.isImportSpecifier(specifier) &&
          testFeatureFlagsPath.test(bindingPath.parentPath.node.source.value)
        ) {
          path.replaceWith(t.valueToNode(flags[name]));
          this.namedImportPathsToBeRemoved.add(bindingPath);
        }
      }
    },
  },

  post() {
    this.namedImportPathsToBeRemoved.forEach(path => {
      path.remove();
    });
  },
});
