/* eslint-disable no-console */

import React from 'react';
import { storiesOf, action } from '@storybook/react';
import Combobox from './Combobox';

const items = [
  {
    label: 'Apple',
    value: 'apple',
  },
  {
    label: 'Banana',
    value: 'banana',
  },
  {
    label: 'Oranges',
    value: 'oranges',
  },
  {
    label: 'Pear',
    value: 'pear',
  },
  {
    label: 'Peanut',
    value: 'peanut',
  },
  {
    label: 'Watermelon',
    value: 'watermelon',
  },
];

storiesOf('Combobox', module)
  .addWithInfo(
    'default',
    `
      Combobox
    `,
    () => (
      <Combobox
        id="test"
        placeholder="Filter..."
        items={items}
        onChange={action('onChange')}
      />
    )
  )
  .addWithInfo('pre-selected', `Combobox`, () => (
    <Combobox
      id="test"
      placeholder="Filter..."
      items={items}
      initialSelectedItem={items[0]}
      onChange={action('onChange')}
    />
  ))
  .addWithInfo(
    'disabled',
    `
      Disabled Combobox
    `,
    () => (
      <Combobox
        id="test"
        placeholder="Filter..."
        items={items}
        onChange={action('onChange')}
        disabled={true}
      />
    )
  );
