/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import LineGraph from '../LineGraph';

storiesOf('LineGraph', module)
  .addWithInfo(
    'Single Data Series',
    `
      Line graphs connect individual data values together to show the continuity from one value to the next, making it a great way to display the shape of values as they change over time. When displaying a time-series, always place time on the x-axis so it reads chronologically from left to right.
    `,
    () => (
      <LineGraph
        data={[
          [
            { xVal: 21, yVal: Math.ceil(Math.random() * 100) },
            { xVal: 32, yVal: Math.ceil(Math.random() * 100) },
            { xVal: 47, yVal: Math.ceil(Math.random() * 100) },
            { xVal: 53, yVal: Math.ceil(Math.random() * 100) },
            { xVal: 61, yVal: Math.ceil(Math.random() * 100) },
            { xVal: 75, yVal: Math.ceil(Math.random() * 100) },
            { xVal: 81, yVal: Math.ceil(Math.random() * 100) },
          ],
        ]}
        title="Line Graph"
        width="700px"
        xLabel="RANDOM NUMBER"
        yLabel="RANDOM NUMBER"
      />
    )
  )
  .addWithInfo(
    'Multiple Data Series',
    `
      Line graphs connect individual data values together to show the continuity from one value to the next, making it a great way to display the shape of values as they change over time. When displaying a time-series, always place time on the x-axis so it reads chronologically from left to right.
    `,
    () => (
      <LineGraph
        data={[
          [
            { xVal: '02/20/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/21/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/22/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/23/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/24/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/25/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/26/2018', yVal: Math.ceil(Math.random() * 100) },
          ],
          [
            { xVal: '02/20/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/21/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/22/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/23/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/24/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/25/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/26/2018', yVal: Math.ceil(Math.random() * 100) },
          ],
          [
            { xVal: '02/20/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/21/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/22/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/23/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/24/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/25/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/26/2018', yVal: Math.ceil(Math.random() * 100) },
          ],
        ]}
        title="Line Graph"
        width="700px"
        xLabel="DATE"
        yLabel="RANDOM NUMBER"
        legendLabels={['Series 1', 'Series 2', 'Series 3']}
        dateFormat="MM/DD/YYYY"
        margin={{
          top: 30,
          right: 100,
          bottom: 60,
          left: 65,
        }}
      />
    )
  );
