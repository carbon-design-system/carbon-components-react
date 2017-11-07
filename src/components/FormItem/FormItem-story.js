import React from 'react';
import { storiesOf } from '@storybook/react';
import FormItem from './FormItem';
import NumberInput from '../NumberInput';

const additionalProps = {
  className: 'some-class',
};

storiesOf('FormItem', module).addWithInfo(
  'Default',
  `
    Form item.

  `,
  () => (
    <FormItem {...additionalProps}>
      <NumberInput />
    </FormItem>
  )
);
