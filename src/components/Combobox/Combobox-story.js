import React from 'react';
import { storiesOf, action } from '@storybook/react';
import Combobox from '../Combobox';

const items = [
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3',
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
];

storiesOf('Combobox', module)
  .addWithInfo(
    'default',
    `
    Combobox
  `,
    () => (
      <div style={{ width: 300 }}>
        <Combobox
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - Combobox')}
          placeholder="Filter..."
        />
      </div>
    )
  )
  .addWithInfo(
    'disabled',
    `
    Disabled Combobox
  `,
    () => (
      <div style={{ width: 300 }}>
        <Combobox
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - Combobox')}
          placeholder="Filter..."
          disabled
        />
      </div>
    )
  );
