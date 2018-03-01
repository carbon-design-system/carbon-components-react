import React from 'react';
import { mount, shallow } from 'enzyme';
import {
  assertMenuOpen,
  assertMenuClosed,
  findMenuItemNode,
  openMenu,
  generateItems,
  generateGenericItem,
} from '../ListBox/test-helpers';
import DropdownV2 from '../DropdownV2';
import DropdownSkeleton from '../DropdownV2/Dropdown.Skeleton';

describe('DropdownV2', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      label: 'input',
      placeholder: 'Filter...',
      type: 'default',
    };
  });

  it('should render', () => {
    const wrapper = mount(<DropdownV2 {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should initially render with the menu not open', () => {
    const wrapper = mount(<DropdownV2 {...mockProps} />);
    assertMenuClosed(wrapper);
  });

  it('should let the user open the menu by clicking on the control', () => {
    const wrapper = mount(<DropdownV2 {...mockProps} />);
    openMenu(wrapper);
    assertMenuOpen(wrapper, mockProps);
  });

  it('should let the user select an option by clicking on the option node', () => {
    const wrapper = mount(<DropdownV2 {...mockProps} />);
    openMenu(wrapper);
    findMenuItemNode(wrapper, 0).simulate('click');
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[0],
    });
    assertMenuClosed(wrapper);

    mockProps.onChange.mockClear();

    openMenu(wrapper);
    findMenuItemNode(wrapper, 1).simulate('click');
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[1],
    });
  });
});

describe('DropdownSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<DropdownSkeleton inline />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--skeleton')).toEqual(true);
      expect(wrapper.hasClass('bx--dropdown-v2')).toEqual(true);
      expect(wrapper.hasClass('bx--list-box--inline')).toEqual(true);
    });
  });
});
