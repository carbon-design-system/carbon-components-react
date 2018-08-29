import React from 'react';
import { storiesOf, action } from '@storybook/react';
import MultiSelectV2 from '../MultiSelectV2';

const items = [
  {
    id: 'item-1',
    text: 'Item 1',
  },
  {
    id: 'item-2',
    text: 'Item 2',
  },
  {
    id: 'item-3',
    text: 'Item 3',
  },
  {
    id: 'item-4',
    text: 'Item 4',
  },
  {
    id: 'item-5',
    text: 'Item 5',
  },
];

const defaultLabel = 'MultiSelect Label';
const defaultPlaceholder = 'Search';

storiesOf('MultiSelectV2', module)
  .addWithInfo(
    'default',
    `
    MultiSelectV2
  `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelectV2
          label={defaultLabel}
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
        />
      </div>
    )
  )
  .addWithInfo(
    'default - item selection toggle',
    `
    MultiSelectV2 with Item Selection Toggle
  `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelectV2
          label={defaultLabel}
          items={items}
          itemToString={item => (item ? item.text : '')}
          toggleItemSelection
          onChange={action('onChange')}
        />
      </div>
    )
  )
  .addWithInfo(
    'inline',
    `
      Inline variant of a MultiSelectV2
    `,
    () => (
      <MultiSelectV2
        type="inline"
        label={defaultLabel}
        items={items}
        itemToString={item => (item ? item.text : '')}
        onChange={action('onChange')}
      />
    )
  )
  .addWithInfo(
    'disabled',
    `
      Disabled variant of a MultiSelectV2
    `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelectV2
          label={defaultLabel}
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
      Disabled, inline variant of a MultiSelectV2
    `,
    () => (
      <MultiSelectV2
        type="inline"
        label={defaultLabel}
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
        <MultiSelectV2
          label={defaultLabel}
          items={items}
          itemToString={item => (item ? item.text : '')}
          initialSelectedItems={[items[0], items[1]]}
          onChange={action('onChange')}
        />
      </div>
    )
  )
  .addWithInfo(
    'with visible initial selected items',
    `
      Inline MultiSelect with selected values displayed inside input
    `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelectV2
          label={defaultLabel}
          placeholder={defaultPlaceholder}
          items={items}
          inlineSelectedItems
          itemToString={item => (item ? item.text : '')}
          initialSelectedItems={[items[0], items[1]]}
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
        <MultiSelectV2
          light
          label={defaultLabel}
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
        />
      </div>
    )
  )
  .addWithInfo(
    'Big list',
    `
    MultiSelect
  `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelectV2
          light
          label={defaultLabel}
          items={ Array.from({ length: 500 }, (v, k) => ({
            id: k, label: `Option ${k}`
          })) }
          onChange={action('onChange')}
          sortItems={ i => i }
        />
      </div>
    )
  )
  .addWithInfo(
    'filterable',
    `
      Filterable version of our MultiSelectV2 component
    `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelectV2.Filterable
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
          placeholder={defaultPlaceholder}
        />
      </div>
    )
  )
  .addWithInfo(
    'filterable - item selection toggle',
    `
      Filterable version of our MultiSelectV2 component with global toggle
    `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelectV2.Filterable
          items={Array.from({ length: 250 }, (v, k) => ({
            id: `item-${k}`, label: `Item ${k}`
          }))}
          toggleItemSelection
          onChange={action('onChange')}
          label={defaultLabel}
          placeholder={defaultPlaceholder}
        />
      </div>
    )
  )
  .addWithInfo('filterable - inner searchbox', () => (
    <div style={{ width: 300 }}>
      <MultiSelectV2.Filterable
        searchBoxType="inner"
        items={items}
        itemToString={item => (item ? item.text : '')}
        onChange={action('onChange')}
        label={defaultLabel}
        placeholder={defaultPlaceholder}
      />
    </div>
  ))
  .addWithInfo('filterable - inline - inner searchbox', () => (
    <div style={{ width: 300 }}>
      <MultiSelectV2.Filterable
        searchBoxType="inner"
        type="inline"
        items={items}
        itemToString={item => (item ? item.text : '')}
        onChange={action('onChange')}
        label={defaultLabel}
        placeholder={defaultPlaceholder}
      />
    </div>
  ))
  .addWithInfo('filterable - inline - inner - selected values', () => (
    <div style={{ width: 300 }}>
      <MultiSelectV2.Filterable
        inlineSelectedItems
        toggleItemSelection
        searchBoxType="inner"
        type="inline"
        items={items}
        itemToString={item => (item ? item.text : '')}
        onChange={action('onChange')}
        label={defaultLabel}
        placeholder={defaultPlaceholder}
      />
    </div>
  ))
  .addWithInfo(
    'filterable - light',
    `
      Light version of our MultiSelectV2 Filterable component
    `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelectV2.Filterable
          light
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
          label={defaultLabel}
          placeholder={defaultPlaceholder}
        />
      </div>
    )
  )
  .addWithInfo(
    'filterable - disabled',
    `
      Dislabed filterable version of our MultiSelectV2 component
    `,
    () => (
      <div style={{ width: 300 }}>
        <MultiSelectV2.Filterable
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
          label={defaultLabel}
          placeholder={defaultPlaceholder}
          disabled
        />
      </div>
    )
  );
