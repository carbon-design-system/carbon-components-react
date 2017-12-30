'use strict';

const { createTransformer } = require('babel-jest');

// This is a custom Jest transformer that process *.js files
// http://facebook.github.io/jest/docs/tutorial-webpack.html
const babelOptions = {
  babelrc: false,
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
    '@babel/preset-stage-1',
  ],
  plugins: ['@babel/transform-object-assign'],
};

module.exports = createTransformer(babelOptions);
