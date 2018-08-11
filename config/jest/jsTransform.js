'use strict';

const { createTransformer } = require('babel-jest');

// This is a custom Jest transformer that process *.js files
// http://facebook.github.io/jest/docs/tutorial-webpack.html
const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 1 versions', 'Firefox ESR'],
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'dev-expression',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
  ],
};

module.exports = createTransformer(babelOptions);
