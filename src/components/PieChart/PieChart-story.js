/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import PieChart from '../PieChart';

storiesOf('PieChart', module).addWithInfo(
  'Default',
  `
    Line graphs connect individual data values together to show the continuity from one value to the next, making it a great way to display the shape of values as they change over time. When displaying a time-series, always place time on the x-axis so it reads chronologically from left to right.
  `,
  () => (
    <PieChart
      data={[
        { label: 'Griffindor', value: Math.ceil(Math.random() * 100) },
        { label: 'Slytherin', value: Math.ceil(Math.random() * 100) },
        { label: 'Ravenclaw', value: Math.ceil(Math.random() * 100) },
        { label: 'Hufflepuff', value: Math.ceil(Math.random() * 100) },
        { label: 'Teachers', value: Math.ceil(Math.random() * 100) },
      ]}
      title="Pie Chart"
      radius={100}
    />
  )
);
