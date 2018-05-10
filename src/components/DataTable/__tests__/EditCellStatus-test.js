import React from 'react';
import { mount } from 'enzyme';

describe('EditCellStatus', () => {
  let EditCellStatus;

  beforeEach(() => {
    EditCellStatus = require('../EditCellStatus').default;
  });

  it('should render', () => {
    const isSaving = mount(<EditCellStatus isSaving />);
    const shouldDisplaySuccess = mount(<EditCellStatus shouldDisplaySuccess />);

    expect(isSaving).toMatchSnapshot();
    expect(shouldDisplaySuccess).toMatchSnapshot();
  });
});
