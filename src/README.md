# Feature flags

[`featureFlags.js`](./featureFlags.js) contains the list of the default values of compile-time feature flags.

Build toolchain, such as [a Babel plugin](../scripts/babel-plugin-transform-carbon-feature-flags.js), can replace variable here and/or the references in order to apply non-default values to those feature flags.

## Example: Rendering `foo` if `aFeatureFlag` is `true`, render `bar` otherwise

```javascript
import { aFeatureFlag } from '/path/to/featureFlags';
...
const MyComponent = props => (<div {...props}>{aFeatureFlag ? 'foo' : 'bar'}</div>);
```
