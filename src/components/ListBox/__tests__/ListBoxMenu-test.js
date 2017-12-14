import React from 'react';
import { mount } from 'enzyme';
import ListBoxMenu from '../ListBoxMenu';

describe('ListBoxMenu', () => {
  it('should render', () => {
    const wrapper = mount(
      <ListBoxMenu>
        <span>Hello</span>
      </ListBoxMenu>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
