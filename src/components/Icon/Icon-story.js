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
    'Custom render',
    `
    Sometimes you want to control your own rendering process, potentially adding your own icons.
  `,
    () => (
      <div>
        <Icon
          name="something--different"
          description="desc here"
          viewBox="0 0 576 512"
          height="40"
          width="40">
          {({ svgProps }) => (
            <svg {...svgProps}>
              <title>desc here</title>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M240 0v0c132.548 0 240 86.957 240 194.224s-107.452 194.224-240 194.224c-12.729 0-25.223-0.81-37.417-2.355-51.553 51.347-111.086 60.554-170.583 61.907v-12.567c32.126-15.677 58-44.233 58-76.867 0-4.553-0.356-9.024-1.015-13.397-54.279-35.607-88.985-89.994-88.985-150.945 0-107.267 107.452-194.224 240-194.224zM498 435.343c0 27.971 18.157 52.449 46 65.886v10.771c-51.563-1.159-98.893-9.051-143.571-53.063-10.57 1.325-21.397 2.020-32.429 2.020-47.735 0-91.704-12.879-126.807-34.52 72.337-0.253 140.63-23.427 192.417-65.336 26.104-21.126 46.697-45.913 61.207-73.674 15.383-29.433 23.183-60.791 23.183-93.203 0-5.224-0.225-10.418-0.629-15.584 36.285 29.967 58.629 70.811 58.629 115.838 0 52.244-30.079 98.861-77.12 129.382-0.571 3.748-0.88 7.58-0.88 11.483z"
              />
            </svg>
          )}
        </Icon>
      </div>
    )
  );
