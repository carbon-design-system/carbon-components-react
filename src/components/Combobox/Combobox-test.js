import React from 'react';
import Downshift from 'downshift';
import { mount, shallow } from 'enzyme';
import {
  generateItems,
  generateGenericItem,
} from '../../tools/testing/items';
import Combobox from '../Combobox';

// Finding nodes in the Combobox
const findInputNode = wrapper => wrapper.find('.bx--text-input');
const findMenuNode = wrapper => wrapper.find('.bx--list-box__menu');
const findMenuIconNode = wrapper => wrapper.find('.bx--list-box__menu-icon');
const findFieldNode = wrapper => wrapper.find('.bx--list-box__field');

// Actions
const openMenu = wrapper => findFieldNode(wrapper).simulate('click');
const clearInput = wrapper => wrapper.instance().handleOnInputValueChange('');

// Common assertions, useful for validating a11y props are set when needed
const assertMenuOpen = (wrapper, mockProps) => {
  expect(findMenuNode(wrapper).children().length).toBe(mockProps.items.length);
  expect(findMenuIconNode(wrapper).prop('className')).toEqual(
    expect.stringContaining('bx--list-box__menu-icon--open')
  );
  expect(findFieldNode(wrapper).props()).toEqual(expect.objectContaining({
    'aria-expanded': true,
    'aria-haspopup': true,
    'aria-label': 'close menu',
  }));
};
const assertClearSelectionHidden = wrapper => {
};

describe('Combobox', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      placeholder: 'Filter...',
      type: 'default',
    };
  });

  it('should display the placeholder text when no items are selected and the control is not focused', () => {
    const wrapper = mount(<Combobox {...mockProps} />);
    expect(findInputNode(wrapper).prop('value')).toBe('');
    expect(findInputNode(wrapper).prop('placeholder')).toBe(mockProps.placeholder);
  });

  it('should display the menu of items when a user clicks on the input', () => {
    const wrapper = mount(<Combobox {...mockProps} />);
    findInputNode(wrapper).simulate('click');

    assertMenuOpen(wrapper, mockProps);
  });

  it('should display the initially selected item found in `initialSelectedItem`', () => {
    const wrapper = mount(
      <Combobox {...mockProps} initialSelectedItem={mockProps.items[0]} />
    );
    expect(findInputNode(wrapper).prop('value')).toEqual(
      mockProps.items[0].label
    );
  });

  it('should call `onChange` each time an item is selected', () => {
    const wrapper = mount(<Combobox {...mockProps} />);
    expect(mockProps.onChange).not.toHaveBeenCalled();

    for (let i = 0; i < mockProps.items.length; i++) {
      clearInput(wrapper);
      openMenu(wrapper);
      wrapper.find('ListBoxMenuItem').at(i).simulate('click');
      expect(mockProps.onChange).toHaveBeenCalledTimes(i + 1);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItem: mockProps.items[i],
      });
    }
  });

  describe('when disabled', () => {
    it('should not let the user edit the input node');

    it('should not let the user expand the menu');
  });

  describe('downshift quirks', () => {
    it('should not trigger the menu when typing a space in input', () => {
      const wrapper = mount(<Combobox {...mockProps} />);

      openMenu(wrapper);
      findInputNode(wrapper).simulate('change', {
        target: {
          value: ' ',
        },
      });

      expect(findMenuNode(wrapper).length).toBe(1);
    });

    it('should set `inputValue` to an empty string if a falsey-y value is given', () => {
      const wrapper = mount(<Combobox {...mockProps} />);

      wrapper.instance().handleOnInputValueChange('foo');
      expect(wrapper.state('inputValue')).toBe('foo');

      wrapper.instance().handleOnInputValueChange(null);
      expect(wrapper.state('inputValue')).toBe('');
    });
  });
});
