import React from 'react';
import DataTableData from '../DataTableData';
import { shallow } from 'enzyme';

describe('DataTableData', () => {
  describe('Renders as expected', () => {
    const dataTableData = shallow(
      <DataTableData>
        <div>Children</div>
      </DataTableData>
    );

    it('should render children as expected', () => {
      expect(dataTableData.find('div').length).toEqual(1);
    });
  });
});
