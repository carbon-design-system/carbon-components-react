/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import ScatterPlot from '../ScatterPlot';

storiesOf('ScatterPlot', module)
  .addWithInfo(
    'Single Data Series',
    `
      Scatter plots are used to determine whether there is a relationship between two sets of quantitative values by showing the linear correlation between them. Users can identify an individual value on the x-axis and see what happens to that value in relation to the y-axis. Taking the graph as a whole, users can see the strength and direction of the correlation. A strong correlation has a tighter grouping of values, whereas a weak correlation has a looser grouping. A positive correlation shows values trending upward from left to right, which is the opposite for a negative correlation where values trend downward from left to right.
    `,
    () => (
      <ScatterPlot
        data={[
          [
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
            {
              xVal: Math.ceil(Math.random() * 100),
              yVal: Math.ceil(Math.random() * 100),
            },
          ],
        ]}
        title="Scatter Plot"
        width="700px"
        xLabel="RANDOM NUMBER"
        yLabel="RANDOM NUMBER"
      />
    )
  )
  .addWithInfo(
    'Multiple Data Series',
    `
      Scatter plots are used to determine whether there is a relationship between two sets of quantitative values by showing the linear correlation between them. Users can identify an individual value on the x-axis and see what happens to that value in relation to the y-axis. Taking the graph as a whole, users can see the strength and direction of the correlation. A strong correlation has a tighter grouping of values, whereas a weak correlation has a looser grouping. A positive correlation shows values trending upward from left to right, which is the opposite for a negative correlation where values trend downward from left to right.
    `,
    () => (
      <ScatterPlot
        data={[
          [
            { xVal: '02/19/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/21/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/21/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/23/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/24/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/25/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/27/2018', yVal: Math.ceil(Math.random() * 100) },
          ],
          [
            { xVal: '02/20/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/22/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/22/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/23/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/16/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/25/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/14/2018', yVal: Math.ceil(Math.random() * 100) },
          ],
          [
            { xVal: '02/20/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/21/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/22/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/18/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/24/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/25/2018', yVal: Math.ceil(Math.random() * 100) },
            { xVal: '02/26/2018', yVal: Math.ceil(Math.random() * 100) },
          ],
        ]}
        title="Scatter Plot"
        width="700px"
        xLabel="DATE"
        yLabel="RANDOM NUMBER"
        legendLabels={['Series 1', 'Series 2', 'Series 3']}
        dateFormat="MM/DD/YYYY"
        margin={{
          top: 30,
          right: 110,
          bottom: 60,
          left: 65,
        }}
      />
    )
  );
