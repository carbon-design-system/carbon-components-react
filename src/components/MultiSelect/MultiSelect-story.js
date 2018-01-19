import React from 'react';
import { storiesOf, action } from '@storybook/react';
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

storiesOf('MultiSelect', module)
  .addWithInfo(
    'default',
    `
    MultiSelect
  `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelect
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange - MultiSelect')}
        />
      </div>
    )
  )
  .addWithInfo(
    'inline',
    `
      Inline variant of a MultiSelect
    `,
    () => (
      <MultiSelect
        type="inline"
        label="Label"
        items={items}
        itemToString={item => (item ? item.text : '')}
        onChange={action('onChange - Inline MultiSelect')}
      />
    )
  )
  .addWithInfo(
    'disabled',
    `
      Disabled variant of a MultiSelect
    `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelect
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
          disabled
        />
      </div>
    )
  )
  .addWithInfo(
    'disabled - inline',
    `
      Disabled, inline variant of a MultiSelect
    `,
    () => (
      <MultiSelect
        type="inline"
        label="Label"
        items={items}
        itemToString={item => (item ? item.text : '')}
        onChange={action('onChange')}
        disabled
      />
    )
  )
  .addWithInfo(
    'with initial selected items',
    `
      Provide a set of items to initially select in the control
    `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelect
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          initialSelectedItems={[items[0], items[1]]}
          onChange={action('onChange - Inline MultiSelect')}
        />
      </div>
    )
  )
  .addWithInfo(
    'filterable',
    `
      Filterable version of our MultiSelect component
    `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelect.Filterable
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
          placeholder="Placeholder..."
        />
      </div>
    )
  )
  .addWithInfo(
    'filterable - disabled',
    `
      Dislabed filterable version of our MultiSelect component
    `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelect.Filterable
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
          placeholder="Placeholder..."
          disabled
        />
      </div>
    )
  );
