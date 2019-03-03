/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, text } from '@storybook/addon-knobs';
import Footer from '../Footer';
import FooterItem from '../FooterItem';
import Link from '../Link';

const props = () => ({
  className: text('CSS class name (className)', 'some-class'),
  labelOne: text('Label in the 1st item (labelOne)', 'Need Help?'),
  linkTextOne: text(
    'Link text in the 1st item (linkTextOne)',
    'Contact Bluemix Sales'
  ),
  linkHrefOne: text(
    'Link href in the 1st item (linkHrefOne)',
    'www.google.com'
  ),
  labelTwo: text('Label in the 1st item (labelTwo)', 'Estimate Monthly Cost'),
  linkTextTwo: text('Label in the 1st item (linkTextTwo)', 'Cost Calculator'),
  linkHrefTwo: text(
    'Link href in the 2nd item (linkHrefTwo)',
    'www.google.com'
  ),
  buttonText: text('Button text (buttonText)', 'Create'),
  onClick: action('onClick'),
});

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => <Footer {...props()}>{text('Footer text', '')}</Footer>,
    {
      info: {
        text: 'Footer is used on configuration screens.',
      },
    }
  )
  .add(
    'with footer items',
    () => (
      <Footer {...props()}>
        <FooterItem
          link={<Link href="#">First Link</Link>}
          label="First Label"
        />
        <FooterItem
          link={<Link href="#">Second Link</Link>}
          label="Second Label"
        />
      </Footer>
    ),
    {
      info: {
        text:
          'Children will be rendered instead of the default footer information. The `FooterItem` component is provided to ',
      },
    }
  );
