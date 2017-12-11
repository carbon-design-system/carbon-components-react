import React from 'react';
import { DataTableContainer } from '../DataTable';
import { shallow } from 'enzyme';

describe('DataTable', () => {
  describe('Renders as expected', () => {
    const dataTableContainer = shallow(
      <DataTableContainer>
        <div>Children</div>
      </DataTableContainer>
    );

    it('has the expected classes', () => {
      expect(
        dataTableContainer.hasClass('bx--data-table-v2-container')
      ).toEqual(true);
    });
  });
});
