import React from 'react';
import DataTableRow from '../DataTableRow';
import { shallow } from 'enzyme';

describe('DataTableRow', () => {
  describe('Renders as expected', () => {
    const dataTableRow = shallow(
      <DataTableRow>
        <div>Children</div>
      </DataTableRow>
    );

    it('should render children as expected', () => {
      expect(dataTableRow.find('div').length).toEqual(1);
    });
  });
});
