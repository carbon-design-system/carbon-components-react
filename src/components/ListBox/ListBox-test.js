import React from 'react';
import { shallow } from 'enzyme';
import ListBox from '../ListBox';
import ListBoxMenu from '../ListBoxMenu';
import { generateItems, generateGenericItem } from '../../tools/testing/items';

describe('ListBox', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      items: generateItems(5, generateGenericItem),
      label: 'Label',
      selectedItem: [],
      isOpen: false,
      itemToString: jest.fn(({ label }) => label),
      clearSelection: jest.fn(),
      onToggleMenu: jest.fn(),
      getItemProps: jest.fn(),
      getButtonProps: jest.fn(),
      innerRef: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = shallow(<ListBox {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call `getButtonProps` to set downshift props', () => {
    const wrapper = shallow(<ListBox {...mockProps} />);
    expect(mockProps.getButtonProps).toHaveBeenCalledWith({
      onClick: mockProps.onToggleMenu,
    });
  });

  it('should display a `ListBoxMenu` if `isOpen` is true', () => {
    const wrapper = shallow(<ListBox {...mockProps} isOpen={true} />);
    expect(wrapper.find(ListBoxMenu).length).toBe(1);
  });

  it('should set an inline class if `type="inline"`', () => {
    const wrapper = shallow(<ListBox {...mockProps} type="inline" />);
    expect(wrapper.find('.bx--list-box--inline').length).toBe(1);
  });
});
