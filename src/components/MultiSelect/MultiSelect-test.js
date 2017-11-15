import React from 'react';
import { mount } from 'enzyme';
import MultiSelect from '../MultiSelect';
import {
  generateItems,
  generateGenericItem,
  generateCustomItem,
  customItemToString,
} from '../../tools/testing/items';

const mouseDownAndUp = (node) => {
  node.dispatchEvent(new window.MouseEvent('mousedown', {bubbles: true}))
  node.dispatchEvent(new window.MouseEvent('mouseup', {bubbles: true}))
}

describe('MultiSelect', () => {
  it('should initialize with no selected items if no `initialSelectedItems` are given', () => {
    const items = generateItems(5, generateGenericItem);
    const wrapper = mount(<MultiSelect label="Field" items={items} />);
    expect(wrapper.state('selectedItems')).toEqual([]);
  });

  it('should initialize with the menu not open', () => {
    const items = generateItems(5, generateGenericItem);
    const wrapper = mount(<MultiSelect label="Field" items={items} />);
    expect(wrapper.state('isOpen')).toEqual(false);
  });

  describe('#handleOnAddItem', () => {
    it('should add the given item to the collection of selected items', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = mount(<MultiSelect label="Field" items={items} />);
      wrapper.instance().handleOnAddItem(items[0]);
      expect(wrapper.state('selectedItems')).toEqual([items[0]]);
    });
  });

  describe('#handleOnRemoveItem', () => {
    it('should remove the given item from the collection of selected items', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = mount(
        <MultiSelect
          label="Field"
          items={items}
          initialSelectedItems={[0, 1]}
        />
      );
      wrapper.instance().handleOnRemoveItem(0);
      expect(wrapper.state('selectedItems')).toEqual([items[1]]);
    });
  });

  describe('#handleOnToggleMenu', () => {
    it('should toggle the boolean `isOpen` field', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = mount(<MultiSelect label="Field" items={items} />);
      expect(wrapper.state('isOpen')).toBe(false);

      wrapper.instance().handleOnToggleMenu();
      expect(wrapper.state('isOpen')).toBe(true);

      wrapper.instance().handleOnToggleMenu();
      expect(wrapper.state('isOpen')).toBe(false);
    });
  });

  describe('#handleClearSelection', () => {
    it('should clear the current collection of selected items', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = mount(
        <MultiSelect
          label="Field"
          items={items}
          initialSelectedItems={[0, 1, 2]}
        />
      );
      wrapper.instance().handleClearSelection();
      expect(wrapper.state('selectedItems')).toEqual([]);
    });
  });

  describe('#handleOnChange', () => {
    it('should add an item to the collection of selected items if it does not exist', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = mount(
        <MultiSelect
          label="Field"
          items={items}
          initialSelectedItems={[0, 1, 2, 3]}
        />
      );
      wrapper.instance().handleOnChange(items[4]);
      expect(wrapper.state('selectedItems')).toEqual(items);
    });

    it('should remove an item from the collection of selected items if it does exist', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = mount(
        <MultiSelect label="Field" items={items} initialSelectedItems={[0]} />
      );
      wrapper.instance().handleOnChange(items[0]);
      expect(wrapper.state('selectedItems')).toEqual([]);
    });
  });

  describe('when `initialSelectedItems` is given', () => {
    it('should initialize `selectedItems` with the given initial selected items', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = mount(
        <MultiSelect
          label="Field"
          items={items}
          initialSelectedItems={[items[0], items[1]]}
        />
      );
      expect(wrapper.state('selectedItems')).toEqual([items[0], items[1]]);
    });

    it('should initialize `selectedItems` with the given selected item indices', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = mount(
        <MultiSelect
          label="Field"
          items={items}
          initialSelectedItems={[0, 1]}
        />
      );
      expect(wrapper.state('selectedItems')).toEqual([items[0], items[1]]);
    });

    it('should initialize an empty `selectedItems` array if `initialSelectedItems` is an empty array', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = mount(
        <MultiSelect label="Field" items={items} initialSelectedItems={[]} />
      );
      expect(wrapper.state('selectedItems')).toEqual([]);
    });
  });

  describe('e2e', () => {
    let mockProps;

    beforeEach(() => {
      mockProps = {
        items: generateItems(5, generateGenericItem),
        initialSelectedItems: [],
        itemToString: ({ label }) => label,
        onChange: jest.fn(),
        label: 'Label',
      };
    });

    it('should warn in __DEV__ if an item in `initialSelectedItems` is falsey');

    it('should warn in __DEV__ if a given item index in `initialSelectedItems` is out of bounds');

    it('should warn in __DEV__ if a given item in `initialSelectedItems` does not exist in `items`');

    it('should open the menu when a user clicks on the ListBox field', () => {
      const wrapper = mount(
        <MultiSelect {...mockProps} />
      );
      wrapper.find('.bx--list-box__field').simulate('click');
      expect(wrapper.find('.bx--list-box__menu').length).toBe(1);
      expect(wrapper.find('.bx--list-box__menu-item').length).toBe(
        mockProps.items.length
      );
    });

    it('should open the menu when a user focuses and hits space on the ListBox field', () => {
      const wrapper = mount(
        <MultiSelect {...mockProps} />
      );
      wrapper.find('.bx--list-box__field')
        .simulate('keydown', {
          key: ' '
        });
      expect(wrapper.find('.bx--list-box__menu').length).toBe(1);
      expect(wrapper.find('.bx--list-box__menu-item').length).toBe(
        mockProps.items.length
      );
    });

    it('should select an item when a user clicks on an item', () => {
      const wrapper = mount(
        <MultiSelect {...mockProps} />
      );
      wrapper.find('.bx--list-box__field').simulate('click');
      wrapper.find('.bx--list-box__menu-item').first().simulate('click');
      expect(wrapper.state('selectedItems')).toEqual([mockProps.items[0]]);
    });

    it('should allow a user to highlight items with the up and down arrow keys', () => {
      const wrapper = mount(
        <MultiSelect {...mockProps} />
      );
      wrapper.find('.bx--list-box__field').simulate('click');
      const simulateArrowDown = () => wrapper.find('.bx--list-box__field')
        .simulate('keydown', {
          key: 'ArrowDown',
        });
      const simulateArrowUp = () => wrapper.find('.bx--list-box__field')
        .simulate('keydown', {
          key: 'ArrowUp',
        });
      const getHighlightedId = () => wrapper
        .find('.bx--list-box__menu-item--highlighted')
        .prop('id');

      simulateArrowDown();
      expect(getHighlightedId())
        .toBe('downshift-1-item-0');

      simulateArrowDown();
      expect(getHighlightedId())
        .toBe('downshift-1-item-1');

      // Simulate "wrap" behavior
      simulateArrowDown();
      simulateArrowDown();
      simulateArrowDown();
      simulateArrowDown();
      expect(getHighlightedId())
        .toBe('downshift-1-item-0');

      simulateArrowUp();
      expect(getHighlightedId())
        .toBe('downshift-1-item-4');
    });

    it('should select an item when a user focuses on an item and hits enter');

    it('should close the menu when a user clicks outside of the control', () => {
      const wrapper = mount(
        <MultiSelect {...mockProps} />
      );
      wrapper.find('.bx--list-box__field').simulate('click');
      mouseDownAndUp(document.body);
      expect(wrapper.state('isOpen')).toBe(false);
    });

    it('should close the menu when a user hits the ESC key on their keyboard');

    it('should show a badge that mirrors the number of selected items', () => {
      const wrapper = mount(
        <MultiSelect {...mockProps} />
      );
      wrapper.find('.bx--list-box__field').simulate('click');
      wrapper.find('.bx--list-box__menu-item').at(0).simulate('click');
      wrapper.find('.bx--list-box__menu-item').at(1).simulate('click');
      expect(wrapper.find('.bx--list-box__badge-text').text()).toBe('2');

      wrapper.find('.bx--list-box__menu-item').at(2).simulate('click');
      wrapper.find('.bx--list-box__menu-item').at(3).simulate('click');
      expect(wrapper.find('.bx--list-box__badge-text').text()).toBe('4');

      wrapper.find('.bx--list-box__menu-item').at(0).simulate('click');
      wrapper.find('.bx--list-box__menu-item').at(1).simulate('click');
      wrapper.find('.bx--list-box__menu-item').at(2).simulate('click');
      wrapper.find('.bx--list-box__menu-item').at(3).simulate('click');
      expect(wrapper.find('.bx--list-box__badge-text').length).toBe(0);
    });

    it('should allow a user to de-select an item by clicking on a selected item', () => {
      const wrapper = mount(
        <MultiSelect {...mockProps} />
      );
      wrapper.find('.bx--list-box__field').simulate('click');
      wrapper.find('.bx--list-box__menu-item').at(0).simulate('click');
      expect(wrapper.find('.bx--list-box__menu-item--active').length).toBe(1);

      wrapper.find('.bx--list-box__menu-item').at(0).simulate('click');
      expect(wrapper.find('.bx--list-box__menu-item--active').length).toBe(0);
    });

    it('should allow a user to de-select an item by hitting enter on a selected item', () => {
      const wrapper = mount(
        <MultiSelect {...mockProps} />
      );
      const simulateArrowDown = () => wrapper.find('.bx--list-box__field')
        .simulate('keydown', {
          key: 'ArrowDown',
        });
      wrapper.find('.bx--list-box__field').simulate('click');
      wrapper.find('.bx--list-box__menu-item').at(0).simulate('click');
      expect(wrapper.find('.bx--list-box__menu-item--active').length).toBe(1);

      simulateArrowDown();
      wrapper.find('.bx--list-box__field').simulate('keydown', {
        key: 'Enter',
      });
      expect(wrapper.find('.bx--list-box__menu-item--active').length).toBe(0);
    });

    it('should allow a user to click on the clear icon to clear all selected items', () => {
      const wrapper = mount(
        <MultiSelect {...mockProps} />
      );
      wrapper.find('.bx--list-box__field').simulate('click');
      wrapper.find('.bx--list-box__menu-item').at(0).simulate('click');
      expect(wrapper.state('selectedItems')).toEqual([mockProps.items[0]]);

      wrapper.find('.bx--list-box__badge').simulate('click');
      expect(wrapper.state('selectedItems')).toEqual([]);
    });

    it('should allow a user to focus the clear icon and hit enter to clear all selected items', () => {
      const wrapper = mount(
        <MultiSelect {...mockProps} />
      );
      wrapper.find('.bx--list-box__field').simulate('click');
      wrapper.find('.bx--list-box__menu-item').at(0).simulate('click');
      expect(wrapper.state('selectedItems')).toEqual([mockProps.items[0]]);

      wrapper.find('.bx--list-box__badge').simulate('keydown', {
        keyCode: 13,
      });
      expect(wrapper.state('selectedItems')).toEqual([]);
    });
  });
});
