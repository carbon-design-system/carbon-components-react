import React from 'react';
import { mount } from 'enzyme';
import ListBoxSelection from '../ListBoxSelection';

describe('ListBoxSelection', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      clearSelection: jest.fn(),
      translateWithId: jest.fn(() => 'translation'),
    };
  });

  it('should render', () => {
    const singleSelectionWrapper = mount(<ListBoxSelection {...mockProps} />);
    const multiSelectionWrapper = mount(
      <ListBoxSelection selectionCount={3} {...mockProps} />
    );
    expect(singleSelectionWrapper).toMatchSnapshot();
    expect(multiSelectionWrapper).toMatchSnapshot();
  });

  it('should call `translateWithId` with the id strings needed to translate', () => {
    mount(<ListBoxSelection {...mockProps} />);
    expect(mockProps.translateWithId).toHaveBeenCalledWith('clear.selection');

    mockProps.translateWithId.mockClear();

    mount(<ListBoxSelection {...mockProps} selectionCount={3} />);
    expect(mockProps.translateWithId).toHaveBeenCalledWith('clear.all');
  });
});
