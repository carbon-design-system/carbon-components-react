import React from 'react';
import { storiesOf } from '@storybook/react';
import Slider from '../../components/Slider';

storiesOf('Slider', module)
  .addWithInfo(
    'default',
    `
      lorem
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Slider />
      </div>
    )
  );
