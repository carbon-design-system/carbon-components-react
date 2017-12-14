import React from 'react';
import { mount } from 'enzyme';
import ListBoxMenuIcon from '../ListBoxMenuIcon';

describe('ListBoxMenuIcon', () => {
  it('should render', () => {
    const openWrapper = mount(<ListBoxMenuIcon isOpen={true} />);
    const closedWrapper = mount(<ListBoxMenuIcon isOpen={false} />);
    expect(openWrapper).toMatchSnapshot();
    expect(closedWrapper).toMatchSnapshot();
  });

  it('should call `translateWithId` to determine the description', () => {
    const translateWithId = jest.fn(() => 'message');
    mount(<ListBoxMenuIcon isOpen={true} translateWithId={translateWithId} />);
    expect(translateWithId).toHaveBeenCalledWith('close.menu');

    translateWithId.mockClear();

    mount(<ListBoxMenuIcon isOpen={false} translateWithId={translateWithId} />);
    expect(translateWithId).toHaveBeenCalledWith('open.menu');
  });
});
