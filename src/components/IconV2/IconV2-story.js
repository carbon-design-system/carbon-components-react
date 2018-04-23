import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  iconAdd,
  iconAddGlyph,
  iconAddOutline,
} from 'carbon-icons/dist/carbon-icons-list';
import IconV2 from '../IconV2';

const props = {
  style: {
    margin: '50px',
  },
  fill: 'grey',
  description: 'This is a description of the icon and what it does in context',
  className: 'extra-class',
};

storiesOf('IconV2', module).addWithInfo(
  'Default',
  `
    Icons are used in the product to present common actions and commands. Modify the fill property to change the color of the icon. The name property defines which icon to display. For accessibility, provide a context-rich description with the description prop. For a full list of icon names, see carbondesignsystem.com/style/iconography/library
  `,
  () => (
    <div>
      <IconV2 {...props} icon={iconAdd} />
      <IconV2 {...props} icon={iconAddGlyph} />
      <IconV2 {...props} icon={iconAddOutline} />
    </div>
  )
);
