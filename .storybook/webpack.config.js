const path = require('path');

module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.rules.push(
    {
      test: /flatpickr\.js$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
              require.resolve('../scripts/babel-plugin-wrap-amd-factory'),
            ],
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: { importLoaders: 2 },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')({
                browsers: ['last 1 version', 'ie >= 11'],
              }),
            ],
          },
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: [path.resolve(__dirname, '..', 'node_modules')],
          },
        },
      ],
    }
  );
  return storybookBaseConfig;
};
