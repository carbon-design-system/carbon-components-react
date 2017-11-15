/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
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

const onChange = evt => {
  console.log(evt);
};

storiesOf('Combobox', module)
  .addWithInfo('Default', `Combobox`, () => (
    <Combobox
      id="test"
      placeholder="Filter..."
      onChange={onChange}
      items={items}
    />
  ))
  .addWithInfo('Pre-selected', `Combobox`, () => (
    <Combobox
      id="test"
      placeholder="Filter..."
      selectedItem={{
        label: 'Banana',
        value: 'banana',
      }}
      onChange={onChange}
      items={items}
    />
  ))
  .addWithInfo('Disabled', 'Combobox', () => (
    <Combobox
      id="test"
      placeholder="Filter..."
      selectedItem={{
        label: 'Banana',
        value: 'banana',
      }}
      onChange={onChange}
      items={items}
      disabled={true}
    />
  ));
