'use strict';

module.exports = function wrapFactory(babel) {
  const t = babel.types;
  return {
    visitor: {
      BlockStatement(path) {
        const parentNode = path.parentPath.node;
        const grandParentNode = path.parentPath.parentPath.node;
        if (
          t.isFunctionExpression(parentNode) &&
          parentNode.params.length === 0 &&
          t.isCallExpression(grandParentNode)
        ) {
          const clone = t.blockStatement([
            t.returnStatement(t.cloneDeep(parentNode)),
          ]);
          path.replaceWith(clone);
          path.stop();
        }
      },
    },
  };
};
