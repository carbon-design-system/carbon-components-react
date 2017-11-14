import React from 'react';
import { mount } from 'enzyme';
import MultiSelect from '../MultiSelect';
import {
  generateItems,
  generateGenericItem,
  generateCustomItem,
  customItemToString,
} from '../../tools/testing/items';

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
});
