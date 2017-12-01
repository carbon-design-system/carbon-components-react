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
  .addWithInfo(
    'inline',
    `
      Inline Combobox
    `,
    () => (
      <Combobox
        id="test"
        type="inline"
        placeholder="Filter..."
        items={items}
        onChange={action('onChange')}
      />
    )
  )
  // .addWithInfo('Pre-selected', `Combobox`, () => (
    // <Combobox
      // id="test"
      // placeholder="Filter..."
      // selectedItem={{
        // label: 'Banana',
        // value: 'banana',
      // }}
      // onChange={onChange}
      // items={items}
    // />
  // ))
  // .addWithInfo('Disabled', 'Combobox', () => (
    // <Combobox
      // id="test"
      // placeholder="Filter..."
      // selectedItem={{
        // label: 'Banana',
        // value: 'banana',
      // }}
      // onChange={onChange}
      // items={items}
      // disabled={true}
    // />
  // ));
