/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import Gauge from '../Gauge';

storiesOf('Gauge', module)
  .addWithInfo(
    'Default',
    `
    Gauge graphs show the part-to-whole relationship of one value compared to its total.
  `,
    () => (
      <Gauge
        amount={Math.floor(Math.random() * 100)}
        total={100}
        title="Gauge"
        amountUnits="GB"
      />
    )
  )
  .addWithInfo(
    'Different Units',
    `
    Can also assign different units to amount and total.
  `,
    () => (
      <Gauge
        amount={Math.floor(Math.random() * 100)}
        total={100}
        title="Gauge"
        radius={100}
        amountUnits="Renewals"
        totalUnits="Total Clients"
        amountFontSize="17px"
        totalFontSize="12px"
      />
    )
  );
