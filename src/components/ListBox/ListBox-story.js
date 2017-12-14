import React from 'react';
import { storiesOf, action } from '@storybook/react';
import Combobox from '../Combobox';
import Dropdown from '../DropdownV2';
import MultiSelect from '../MultiSelect';
import FilterableMultiSelect from '../FilterableMultiSelect';

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
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Dropdown
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - Dropdown')}
        />
        <div style={{ marginRight: '2rem' }} />
        <Dropdown
          type="inline"
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - Dropdown')}
        />
        <div style={{ marginRight: '2rem' }} />
        <Dropdown
          type="inline"
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - Dropdown')}
          disabled
        />
      </div>
      <div style={{ marginBottom: '2rem' }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MultiSelect
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - MultiSelect')}
        />
        <div style={{ marginRight: '2rem' }} />
        <MultiSelect
          type="inline"
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - Inline MultiSelect')}
        />
        <div style={{ marginRight: '2rem' }} />
        <MultiSelect
          type="inline"
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - Inline MultiSelect')}
          disabled
        />
      </div>
      <div style={{ marginBottom: '2rem' }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Combobox
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - Combobox')}
          placeholder="Filter..."
        />
        <div style={{ marginRight: '2rem' }} />
        <Combobox
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - Combobox')}
          placeholder="Filter..."
          disabled
        />
      </div>
      <div style={{ marginBottom: '2rem' }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FilterableMultiSelect
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - Combobox')}
          placeholder="Filter..."
        />
        <div style={{ marginRight: '2rem' }} />
        <FilterableMultiSelect
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - Combobox')}
          placeholder="Filter..."
          disabled
        />
      </div>
    </div>
  )
);
