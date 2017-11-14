import React from 'react';
import { shallow } from 'enzyme';
import ListBoxBadge from '../ListBoxBadge';

describe('ListBoxBadge component', () => {
  let mockClearSelection;

  beforeEach(() => {
    mockClearSelection = jest.fn();
  });

  it('should render', () => {
    const wrapper = shallow(
      <ListBoxBadge clearSelection={mockClearSelection} count={5} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render nothing if the count is 0', () => {
    const wrapper = shallow(
      <ListBoxBadge clearSelection={mockClearSelection} count={0} />
    );
    expect(wrapper.type()).toEqual(null);
  });

  it('should render a non-zero count as badge text', () => {
    const count = 5;
    const wrapper = shallow(
      <ListBoxBadge clearSelection={mockClearSelection} count={count} />
    );
    expect(wrapper.find('.bx--list-box__badge-text').text()).toBe(`${count}`);
  });

  it('should call clearSelection when clicked on', () => {
    const wrapper = shallow(
      <ListBoxBadge clearSelection={mockClearSelection} count={5} />
    );
    wrapper.simulate('click', { stopPropagation: () => {} });
    expect(mockClearSelection).toHaveBeenCalledTimes(1);
  });

  it('should call clearSelection when the enter key is pressed', () => {
    const wrapper = shallow(
      <ListBoxBadge clearSelection={mockClearSelection} count={5} />
    );
    wrapper.simulate('keyDown', { keyCode: 8 });
    expect(mockClearSelection).not.toHaveBeenCalled();
    wrapper.simulate('keyDown', { keyCode: 13 });
    expect(mockClearSelection).toHaveBeenCalledTimes(1);
  });
});
