# `scripts` directory

This directory contains some code to build stuffs.

## `babel-plugin-transform-carbon-feature-flags.js`

Compile time code replacement for babel similar to
Webpack's [`DefinePlugin`](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin).
This replaces identifiers associated with named imports from Carbon React
[`featureFlags.js`](../src/featureFlags.js),
whereas Webpack's `DefinePlugin` works with non-referenced identifiers.

### `.babelrc`

```json
{
  ...
  "plugins": [
    ...
    [
      "/path/to/babel-plugin-transform-carbon-feature-flags",
      {
        "aFeatureFlag": true
      }
    ],
  ],
  ...  
}
```

### In

```javascript
import { aFeatureFlag } from '/path/to/featureFlags';
...
const MyComponent = props => (<div {...props}>{aFeatureFlag ? 'foo' : 'bar'}</div>);
```

### Out

```javascript
import '/path/to/featureFlags';
...
const MyComponent = props => (<div {...props}>{true ? 'foo' : 'bar'}</div>);
```
