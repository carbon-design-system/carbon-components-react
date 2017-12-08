import React from 'react';
import { mount } from 'enzyme';
import ListBoxMenuItem from '../ListBoxMenuItem';

describe('ListBoxMenuItem', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      isActive: false,
      isHighlighted: false,
      children: <span>ListBoxMenuItem</span>,
    };
  });

  it('should render', () => {
    const wrapper = mount(<ListBoxMenuItem {...mockProps} />);
    const activeWrapper = mount(
      <ListBoxMenuItem {...mockProps} isActive={true} />
    );
    const highlightedWrapper = mount(
      <ListBoxMenuItem {...mockProps} isHighlighted={true} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(activeWrapper).toMatchSnapshot();
    expect(highlightedWrapper).toMatchSnapshot();
  });
});
