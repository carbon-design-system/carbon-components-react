import React from 'react';
import { mount } from 'enzyme';
import ListBoxField from '../ListBoxField';

describe('ListBoxField', () => {
  it('should render', () => {
    const wrapper = mount(
      <ListBoxField>
        <span>Hello</span>
      </ListBoxField>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should be focusable', () => {
    const wrapper = mount(
      <ListBoxField>
        <span>Hello</span>
      </ListBoxField>
    );
    expect(wrapper.children().prop('tabIndex')).toBe('0');
  });
});
