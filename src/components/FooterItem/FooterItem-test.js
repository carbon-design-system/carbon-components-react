/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FooterItem from '../FooterItem';
import { mount } from 'enzyme';
import Link from '../Link';

describe('FooterItem', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <FooterItem
        className="extra-class"
        link={
          <Link className="custom-link" href="#">
            First Link
          </Link>
        }
        label="First Label"
      />
    );

    const item = wrapper.find('div');
    const label = wrapper.find('p');

    it('renders a footer item', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('renders a custom link element', () => {
      expect(wrapper.exists('.custom-link')).toEqual(true);
    });

    it('has the expected classes', () => {
      expect(item.hasClass('bx--footer-info__item')).toEqual(true);
      expect(label.hasClass('bx--footer-label')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(item.hasClass('extra-class')).toEqual(true);
    });
  });
});
