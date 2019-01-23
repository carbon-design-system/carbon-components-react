import React from 'react';
import { storiesOf, action } from '@storybook/react';
import DropdownV2 from '../DropdownV2';
import DropdownItem from '../DropdownItem';
import DropdownSkeleton from '../DropdownV2/Dropdown.Skeleton';
import WithState from '../../tools/withState';

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

const stringItems = ['Option 1', 'Option 2', 'Option 3'];

const dropdownItems = [
  { itemText: 'hello', value: 'hello', style: { opacity: 1 } },
  { itemText: 'world', value: 'world', style: { opacity: 1 } },
];

const itemToElement = item => {
  const itemAsArray = item.text.split(' ');
  return (
    <div>
      <span>{itemAsArray[0]}</span>
      <span style={{ color: 'red' }}> {itemAsArray[1]}</span>
    </div>
  );
};

storiesOf('DropdownV2', module)
  .addWithInfo(
    'default',
    `
    DropdownV2
  `,
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
        />
      </div>
    )
  )
  .add(
    'items as strings',
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
          label="Label"
          items={stringItems}
          onChange={action('onChange')}
        />
      </div>
    ),
    {
      info: {
        text: 'Rendering an array of strings as `items`',
      },
    }
  )
  .add(
    'items as components',
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          itemToElement={itemToElement}
          onChange={action('onChange')}
        />
      </div>
    ),
    {
      info: {
        text: `Rendering items as custom components`,
      },
    }
  )
  .add(
    'with DropdownItems',
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
          label="Label"
          items={dropdownItems}
          itemToString={item => (item ? item.itemText : '')}
          itemToElement={DropdownItem}
          onChange={action('onChange')}
        />
      </div>
    ),
    {
      info: {
        text: `
          Using DropdownItem as the components to render. Has some kinks due to the onClick in the DropdownItem.
        `,
      },
    }
  )
  .addWithInfo(
    'inline',
    `
    Disabled DropdownV2
  `,
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
          type="inline"
          label="Label"
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
        />
      </div>
    )
  )
  .addWithInfo(
    'disabled',
    `
    Disabled DropdownV2
  `,
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
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
    Disabled Inline DropdownV2
  `,
    () => (
      <div style={{ width: 300 }}>
        <DropdownV2
          type="inline"
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
    'fully controlled',
    `
    Sometimes you want to control everything.
  `,
    () => (
      <WithState initialState={{ selectedItem: items[0] }}>
        {({ state, setState }) => (
          <div style={{ width: 300 }}>
            <DropdownV2
              type="inline"
              label="Label"
              items={items}
              itemToString={item => (item ? item.text : '')}
              onChange={({ selectedItem }) =>
                setTimeout(() => setState({ selectedItem }), 1000)
              }
              selectedItem={state.selectedItem}
            />
          </div>
        )}
      </WithState>
    )
  )
  .addWithInfo(
    'skeleton',
    `
    Placeholder skeleton state to use when content is loading.
  `,
    () => (
      <div style={{ width: 300 }}>
        <DropdownSkeleton />&nbsp;
        <DropdownSkeleton inline />
      </div>
    )
  );
