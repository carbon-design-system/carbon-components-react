# Components

<!-- prettier-ignore-start -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

* [Documentation](#documentation)
  * [File Structure](#file-structure)
  * [Storybook README](#storybook-readme)
* [CSS class prefix](#css-class-prefix)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- prettier-ignore-end -->

## Documentation

We're actively looking to improve our Component documentation through generating
`README.md` files in each of our component directories. The hope is that we can
add documentation around installing and using our components, in addition to
covering common use-cases for each component with code examples.

If you would like to help out, there are two components of contributing
component-specific documentation to `carbon-components-react`:

1. Create a `README.md` file using [this file structure](#file-structure)
2. Add the `README.md` file to the component's story using [these steps](#storybook-readme)

Once those steps are complete, you should be able to follow our [contribution guidelines](/.github/CONTRIBUTING.md) to finish making a Pull Request for your work!

### File Structure

Each markdown file will tend to take on the following initial structure:

* Component name heading
* Brief description of the component
* A table of contents block
* Steps around installing and using the component
* Details around any special cases with component prop types
* Details around common use-cases for the components, either with embedded code
  or links to [codesandbox.io](http://codesandbox.io) playgrounds

You can use the template available [here](/docs/component-template.md) to help
with filling out each of these steps.

### Storybook README

After creating the `README.md` file for a component, you'll most likely want to
add it to Storybook so that it shows up in the tabs for the component story. To
do this, we'll use the [`storybook-readme`](https://github.com/tuchk4/storybook-readme) add-on.

The first step will be to import the `withReadme` helper from `storybook-readme`
and the `README.md` file in the component story by doing:

```js
import { withReadme } from 'storybook-readme';
import readme from './README.md';
```

Afterwards, you can decorate each story with the `withReadme` helper by doing:

```js
import { withReadme } from 'storybook-readme';
import readme from './README.md';

storiesOf('ComponentName', module).add(
  'story-title',
  withReadme(readme, () => <ComponentExample />, {
    info: {
      text: 'Information for the given story',
    },
  })
);
```

## CSS class prefix

Carbon CSS classes begin with `bx--` by default. It can be changed by setting `$prefix` Sass variable and building `carbon-components` Sass files.

To apply your CSS class prefix to `carbon-components-react` components, you can define your CSS class prefix as a React context and create wrapper components with your React context applied. Here's an example:

```javascript
import React, { Component, createContext } from 'react';
import mapValues from 'lodash.mapvalues';
import { Button, Checkbox } from 'carbon-components-react';

// The `PrefixConsumer` and `withOurBrandPrefix` here can be defined in a separate module
const { Consumer: PrefixConsumer } = createContext('ourbrand');

const withOurBrandPrefix = components =>
  mapValues(components, Component => props => (
    <PrefixConsumer>
      {prefix => <Component {...props} prefix={prefix} />}
    </PrefixConsumer>
  ));

// Create wrapper components with `ourbrand` CSS class prefix applied
const {
  Button: OurBrandButton,
  Checkbox: OurBrandCheckbox,
} = withOurBrandPrefix({ Button, Checkbox });

class MyApp extends Component {
  render() {
    <>
      {/* Uses ourbrand--btn instead of bx--btn */}
      <OurBrandButton kind="primary">Button in our brand</OurBrandButton>
      <fieldset className="ourbrand--fieldset">
        <legend className="ourbrand--label">Checkbox in our brand</legend>
        {/* Uses ourbrand--checkbox instead of bx--checkbox */}
        <OurBrandCheckbox
          defaultChecked
          id="checkbox"
          labelText="Checkbox label"
        />
      </fieldset>
    </>;
  }
}
```
