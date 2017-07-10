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
        <Slider id="slider" value={50} min={0} max={100} step={1} />
      </div>
    )
  );
