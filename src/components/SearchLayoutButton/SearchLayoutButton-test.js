/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { iconList, iconGrid } from 'carbon-icons';
import Icon from '../Icon';
import SearchLayoutButton from '../SearchLayoutButton';
import { shallow, mount } from 'enzyme';

describe('SearchLayoutButton', () => {
  const wrapper = mount(<SearchLayoutButton labelText="testlabel" />);

  describe('buttons', () => {
    const btn = wrapper.find('button');

    it('should have type="button"', () => {
      const type = btn.instance().getAttribute('type');
      expect(type).toEqual('button');
    });

    it('has expected class for sort button', () => {
      expect(btn.hasClass('bx--search-button')).toEqual(true);
    });
  });

  describe('icons', () => {
    it('should use "list" icon for toggle button', () => {
      const icon = wrapper.find(Icon);
      expect(icon.props().icon).toEqual(iconList);
    });

    it('should use "grid" icon when format state is not "list"', () => {
      wrapper.setState({ format: 'not-list' });
      const icon = wrapper.find(Icon);
      expect(icon.props().icon).toEqual(iconGrid);
    });

    it('should support specifying the layout via props', () => {
      const wrapperWithFormatProps = mount(
        <SearchLayoutButton format="grid" />
      );
      expect(wrapperWithFormatProps.find(Icon).props().icon).toEqual(iconGrid);
      wrapperWithFormatProps.setProps({ format: 'list' });
      expect(wrapperWithFormatProps.find(Icon).props().icon).toEqual(iconList);
    });

    it('should avoid change the format upon setting props, unless there the value actually changes', () => {
      const wrapperWithFormatProps = shallow(<SearchLayoutButton />);
      wrapperWithFormatProps.setProps({ format: 'grid' });
      wrapperWithFormatProps.setState({ format: 'list' });
      wrapperWithFormatProps.setProps({ format: 'grid' });
      expect(wrapperWithFormatProps.state().format).toEqual('list');
    });

    it('should support being notified of change in layout', () => {
      const onChangeFormat = jest.fn();
      const wrapperWithFormatProps = mount(
        <SearchLayoutButton format="grid" onChangeFormat={onChangeFormat} />
      );
      wrapperWithFormatProps.find('button').simulate('click');
      wrapperWithFormatProps.find('button').simulate('click');
      expect(onChangeFormat.mock.calls).toEqual([
        [{ format: 'list' }],
        [{ format: 'grid' }],
      ]);
    });
  });
});
