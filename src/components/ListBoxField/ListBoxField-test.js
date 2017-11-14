import React from 'react';
import { shallow } from 'enzyme';
import ListBoxField from '../ListBoxField';
import { generateItems, generateGenericItem } from '../../tools/testing/items';

describe('ListBoxField', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      selectedItem: generateItems(5, generateGenericItem),
      clearSelection: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = shallow(
      <ListBoxField label="Label" isOpen={false} {...mockProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should be focus-able', () => {
    const wrapper = shallow(
      <ListBoxField label="Label" isOpen={false} {...mockProps} />
    );
    expect(wrapper.prop('tabIndex')).toBe('0');
  });

  it('should add an inline class if `type="inline"` is provided', () => {
    const wrapper = shallow(
      <ListBoxField type="inline" label="Label" isOpen={false} {...mockProps} />
    );
    expect(wrapper.find('.bx--list-box__field--inline').length).toBe(1);
  });
});
