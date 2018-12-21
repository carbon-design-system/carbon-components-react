import React from 'react';
import { storiesOf } from '@storybook/react';
import FormItem from './FormItem';
import NumberInput from '../NumberInput';
import { componentsX } from '../../internal/FeatureFlags';

storiesOf('FormItem', module).add(
  'Default',
  () => (
    <FormItem>
      {componentsX ? (
        <NumberInput id="number-input-1" />
      ) : (
        <NumberInput id="number-input-1" hideLabel />
      )}
    </FormItem>
  ),
  {
    info: {
      text: 'Form item.',
    },
  }
);
