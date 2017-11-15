import React from 'react';
import { shallow } from 'enzyme';
import ListBoxMenu from '../ListBoxMenu';
import {
  generateItems,
  generateGenericItem,
} from '../../tools/testing/items';

describe('ListBoxMenu', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      itemToString: jest.fn(({ label }) => label),
      getItemProps: jest.fn(() => ({})),
    };
  });

  it('should render', () => {
    const wrapper = shallow(
      <ListBoxMenu
        items={generateItems(5, generateGenericItem)}
        selectedItem={[]}
        highlightedIndex={null}
        {...mockProps}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call `getItemProps` for each item that is generated', () => {
    const itemsCount = 5;
    shallow(
      <ListBoxMenu
        items={generateItems(itemsCount, generateGenericItem)}
        selectedItem={[]}
        highlightedIndex={null}
        {...mockProps}
      />
    );
    expect(mockProps.getItemProps).toHaveBeenCalledTimes(itemsCount);
  });

  describe('with selected items', () => {
    it('should add an active class to selected items', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = shallow(
        <ListBoxMenu
          items={items}
          selectedItem={[items[0], items[1]]}
          highlightedIndex={null}
          {...mockProps}
        />
      );
      expect(wrapper.find('.bx--list-box__menu-item--active').length).toBe(2);
    });

    it('should set the checkbox value to checked for a selected item', () => {
      const items = generateItems(5, generateGenericItem);
      const wrapper = shallow(
        <ListBoxMenu
          items={items}
          selectedItem={[items[0], items[1]]}
          highlightedIndex={null}
          {...mockProps}
        />
      );
      wrapper.find('.bx--list-box__menu-item--active input').forEach(node => {
        expect(node.prop('checked')).toBe(true);
      });
    });
  });

  describe('with highlighted index', () => {
    it('should add a highlighted class for the specific item at the index', () => {
      const wrapper = shallow(
        <ListBoxMenu
          items={generateItems(5, generateGenericItem)}
          selectedItem={[]}
          highlightedIndex={0}
          {...mockProps}
        />
      );
      expect(wrapper.find('.bx--list-box__menu-item--highlighted').length).toBe(
        1
      );
    });
  });
});
