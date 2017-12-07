import React from 'react';
import { storiesOf, action } from '@storybook/react';
import Combobox from '../Combobox';
import MultiSelect from '../MultiSelect';

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

storiesOf('ListBox', module).addWithInfo(
  'default',
  `
    MultiSelect and Combobox
  `,
  () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Combobox
        items={items}
        itemToString={item => (item ? item.text : '')}
        onChange={action('Combobox - onChange')}
        placeholder="Filter..."
      />
      <div style={{ marginRight: '2rem' }} />
      <MultiSelect
        label="Label"
        items={items}
        itemToString={item => (item ? item.text : '')}
        onChange={action('MultiSelect - onChange')}
      />
    </div>
  )
);
