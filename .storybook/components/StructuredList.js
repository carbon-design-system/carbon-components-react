import React from 'react';
import { storiesOf, action } from '@storybook/react';
import StructuredList from '../../components/StructuredList';
import SelectItem from '../../components/SelectItem';
import SelectItemGroup from '../../components/SelectItemGroup';

const selectProps = {
  onClick: () => {
    action('click');
  }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('StructuredList', module).addWithInfo(
  'default',
  `
      description here
    `,
  () => <StructuredList>hi</StructuredList>
);
