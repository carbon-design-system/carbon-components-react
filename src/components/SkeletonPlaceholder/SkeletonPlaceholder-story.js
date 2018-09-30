/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select } from '@storybook/addon-knobs';
import SkeletonPlaceholder from '../SkeletonPlaceholder';

const widths = {
  '100px': '100px',
  '200px': '200px',
  '250px': '250px',
  '50%': '50%',
  '75%': '75%',
  '100%': '100%',
};

const heights = {
  '100px': '100px',
  '200px': '200px',
  '250px': '250px',
  '50%': '50%',
  '75%': '75%',
  '100%': '100%',
};

const props = () => ({
  width: select('Width (in px or %)', widths),
  height: select('Height (in px or %)', heights),
});

storiesOf('SkeletonPlaceholder', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    withInfo({
      text: `
        Skeleton states are used as a progressive loading state while the user waits for content to load.

        By taking a height and/or width property, this component can be used when you know the exact dimensions of the incoming content, such as an image.
      `,
    })(() => (
      <div style={{ height: '250px', width: '250px' }}>
        <SkeletonPlaceholder {...props()} />
      </div>
    ))
  );
