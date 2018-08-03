import React from 'react';
import { storiesOf, action } from '@storybook/react';
import ComboBox from '../ComboBox';
import WithState from '../../tools/withState';

const items = [
  {
    id: 'option-1',
    label: 'Option 1',
  },
  {
    id: 'option-2',
    label: 'Option 2',
  },
  {
    id: 'option-3',
    label: 'Option 3',
  },
  {
    id: 'option-4',
    label: 'Option 4',
  },
];

storiesOf('ComboBox', module)
  .addWithInfo(
    'default',
    `
    ComboBox
  `,
    () => (
      <div style={{ width: 300 }}>
        <ComboBox
          items={items}
          itemToString={item => (item ? item.label : '')}
          onChange={action('onChange - ComboBox')}
          placeholder="Filter..."
        />
      </div>
    )
  )
  .addWithInfo(
    'disabled',
    `
    Disabled ComboBox
  `,
    () => (
      <div style={{ width: 300 }}>
        <ComboBox
          items={items}
          itemToString={item => (item ? item.label : '')}
          onChange={action('onChange - ComboBox')}
          placeholder="Filter..."
          disabled
        />
      </div>
    )
  )
  .addWithInfo(
    'custom label input handling',
    `Sometimes you want to perform an async action to trigger a backend call on input change.`,
    () => (
      <WithState initialState={{ inputlabel: '' }}>
        {({ state, setState }) => (
          <div style={{ width: 300 }}>
            <ComboBox
              items={items}
              itemToString={item =>
                item ? `${item.label} queried with ${state.inputlabel}` : ''
              }
              onChange={action('onChange - ComboBox')}
              placeholder="Filter..."
              shouldFilterItem={() => true}
              onInputChange={label => setState({ inputlabel: label })}
            />
          </div>
        )}
      </WithState>
    )
  );
