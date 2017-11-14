import React from 'react';
import { shallow } from 'enzyme';
import ListBoxLabel from '../ListBoxLabel';

describe('ListBoxLabel', () => {
  it('should render', () => {
    const wrapper = shallow(
      <ListBoxLabel label="Label" count={5} clearSelection={jest.fn()} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
