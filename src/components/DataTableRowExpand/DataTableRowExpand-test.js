import React from 'react';
import DataTableRowExpand from '../DataTableRowExpand';
import { shallow } from 'enzyme';

describe('DataTableRowExpand', () => {
  describe('Renders as expected', () => {
    const dataTableRowExpand = shallow(<DataTableRowExpand />);

    it('has the expected classes', () => {
      expect(dataTableRowExpand.hasClass('bx--table-expand-v2')).toEqual(true);
    });
  });
});
