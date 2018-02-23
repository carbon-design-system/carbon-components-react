/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import PieChart from '../PieChart';

storiesOf('PieChart', module).addWithInfo(
  'Default',
  `
    Pie charts show individual values that make up a whole data set so users can compare the values to each other and see how each value compares to the whole. A common way to express the part-to-whole relationship is to use percentages, with the whole equaling 100% and each of its parts equaling smaller percentages corresponding to its value relative to the whole. Expressing exact values is useful as long as the total is also shown.
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
