import React from 'react';
import { shallow } from 'enzyme';
import ListBoxMenuIcon from '../ListBoxMenuIcon';

describe('ListBoxMenuIcon component', () => {
  it('should render', () => {
    const openWrapper = shallow(<ListBoxMenuIcon isOpen={true} />);
    const closeWrapper = shallow(<ListBoxMenuIcon isOpen={false} />);
    expect(openWrapper).toMatchSnapshot();
    expect(closeWrapper).toMatchSnapshot();
  });

  it('should update the Icon description if the menu is open or closed', () => {
    const wrapper = shallow(<ListBoxMenuIcon isOpen={false} />);
    expect(wrapper.prop('description')).toBe('Open menu');
    wrapper.setProps({ isOpen: true });
    expect(wrapper.prop('description')).toBe('Close menu');
  });
});
