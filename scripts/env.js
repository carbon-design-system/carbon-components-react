const BABEL_ENV = process.env.BABEL_ENV;

module.exports = () => ({
  presets: [
    [
      '@babel/env',
      {
        modules: BABEL_ENV === 'es' ? false : 'commonjs',
        targets: {
          browsers: ['last 1 versions', 'Firefox ESR'],
        },
      },
    ],
  ],
});
