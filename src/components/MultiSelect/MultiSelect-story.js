import React from 'react';
import { storiesOf, action } from '@storybook/react';
import MultiSelect from '../MultiSelect';

const items = [
  {
    id: 'item-1',
    label: 'Item 1',
  },
  {
    id: 'item-2',
    label: 'Item 2',
  },
  {
    id: 'item-3',
    label: 'Item 3',
  },
  {
    id: 'item-4',
    label: 'Item 4',
  },
];

const defaultLabel = 'MultiSelect Label';
const defaultPlaceholder = 'Filter';

storiesOf('MultiSelect', module)
  .addWithInfo(
    'default',
    `
    MultiSelect
  `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelect
          label={defaultLabel}
          items={items}
          itemToString={item => (item ? item.label : '')}
          onChange={action('onChange')}
        />
      </div>
    )
  )
  .addWithInfo(
    'light',
    `
    MultiSelect
  `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelect
          light
          label={defaultLabel}
          items={items}
          itemToString={item => (item ? item.label : '')}
          onChange={action('onChange')}
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
        label={defaultLabel}
        items={items}
        itemToString={item => (item ? item.label : '')}
        onChange={action('onChange')}
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
          label={defaultLabel}
          items={items}
          itemToString={item => (item ? item.label : '')}
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
        label={defaultLabel}
        items={items}
        itemToString={item => (item ? item.label : '')}
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
          label={defaultLabel}
          items={items}
          itemToString={item => (item ? item.label : '')}
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
          itemToString={item => (item ? item.label : '')}
          onChange={action('onChange')}
          placeholder={defaultPlaceholder}
        />
      </div>
    )
  )
  .addWithInfo(
    'filterable light',
    `
      Filterable version of our MultiSelect component
    `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelect.Filterable
          light
          items={items}
          itemToString={item => (item ? item.label : '')}
          onChange={action('onChange')}
          placeholder={defaultPlaceholder}
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
          itemToString={item => (item ? item.label : '')}
          onChange={action('onChange')}
          placeholder={defaultPlaceholder}
          disabled
        />
      </div>
    )
  );
