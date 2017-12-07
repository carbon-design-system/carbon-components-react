import React from 'react';
import { shallow } from 'enzyme';
import DropdownMenuIcon from '../DropdownMenuIcon';

describe('DropdownMenuIcon component', () => {
  it('should render', () => {
    const openWrapper = shallow(<DropdownMenuIcon isOpen={true} />);
    const closeWrapper = shallow(<DropdownMenuIcon isOpen={false} />);
    expect(openWrapper).toMatchSnapshot();
    expect(closeWrapper).toMatchSnapshot();
  });

  it('should update the Icon description if the menu is open or closed', () => {
    const wrapper = shallow(<DropdownMenuIcon isOpen={false} />);
    expect(wrapper.prop('description')).toBe('Open menu');
    wrapper.setProps({ isOpen: true });
    expect(wrapper.prop('description')).toBe('Close menu');
  });
});
