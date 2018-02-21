/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import BarGraph from '../BarGraph';

storiesOf('BarGraph', module).addWithInfo(
  'Default',
  `
      BarGraph can be used for data visualization.
    `,
  () => (
    <BarGraph
      data={[
        { xVal: '02/20/2018', yVal: Math.ceil(Math.random() * 100) },
        { xVal: '02/21/2018', yVal: Math.ceil(Math.random() * 100) },
        { xVal: '02/22/2018', yVal: Math.ceil(Math.random() * 100) },
        { xVal: '02/23/2018', yVal: Math.ceil(Math.random() * 100) },
        { xVal: '02/24/2018', yVal: Math.ceil(Math.random() * 100) },
        { xVal: '02/25/2018', yVal: Math.ceil(Math.random() * 100) },
        { xVal: '02/26/2018', yVal: Math.ceil(Math.random() * 100) },
      ]}
      title="Bar Graph"
      width="700px"
      xLabel="DATE"
      yLabel="RANDOM NUMBER"
    />
  )
);
