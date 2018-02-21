import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from '../Icon';

const props = {
  style: {
    margin: '50px',
  },
  fill: 'grey',
  description: 'This is a description of the icon and what it does in context',
  className: 'extra-class',
};

storiesOf('Icon', module)
  .addWithInfo(
    'Default',
    `
      Icons are used in the product to present common actions and commands. Modify the fill property to change the color of the icon. The name property defines which icon to display. For accessibility, provide a context-rich description with the description prop. For a full list of icon names, see carbondesignsystem.com/style/iconography/library
    `,
    () => (
      <div>
        <Icon name="icon--add" {...props} />
        <Icon name="add--glyph" {...props} />
        <Icon name="add--outline" {...props} />
      </div>
    )
  )
  .addWithInfo(
    'custom icon',
    `
      To use a custom icon, define an SVG symbol with a given ID somewhere in your HTML (either manually or using a tool such as 'svg-sprite-loader') and then pass that ID name to the Icon component using the special prefix of 'xlink--'. Custom icons can be used with other components that take a icon prop, such as Button.
    `,
    () => (
      <div>
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <symbol viewBox="0 0 48 48" id="mycustomicon">
            <g>
              <polygon
                fill="#3d70b2"
                points="11.2968 16.0997 11.0268 16.2197 10.7558 16.0997 4.1938 13.3407 -0.0002 15.0797 4.4648 16.9397 11.0268 19.7597 17.5888 16.9397 22.0528 15.0807 22.0528 15.0797 17.8588 13.3407"
              />
              <polygon
                fill="#41d6c3"
                points="0 4.6796 4.194 6.4206 4.465 6.5396 4.6 6.6006 5.006 6.7806 9.132 8.5196 9.538 8.6996 9.944 8.8796 11.027 9.3596 12.109 8.8796 12.514 8.6996 12.92 8.5196 17.048 6.7806 17.453 6.6006 17.589 6.5396 17.859 6.4206 22.053 4.6796 22.053 4.6796 11.027 0.0006"
              />
              <polygon
                fill="#5596e6"
                points="11.2968 10.8698 11.0268 10.9908 10.7558 10.8698 4.1938 8.1108 -0.0002 9.8498 4.4648 11.7108 11.0268 14.5298 17.5888 11.7108 22.0528 9.8508 22.0528 9.8498 17.8588 8.1108"
              />
            </g>
          </symbol>
        </svg>

        <Icon name="xlink--mycustomicon" {...props} />
      </div>
    )
  );
