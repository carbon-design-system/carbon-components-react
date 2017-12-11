import React from 'react';
import { DataTableExpandableRow } from '../DataTableExpandableRow';
import { shallow } from 'enzyme';

describe('DataTableExpandableRow', () => {
  describe('Renders as expected', () => {
    const dataTableExpandableRow = shallow(
      <DataTableExpandableRow>
        <div>Children</div>
      </DataTableExpandableRow>
    );

    it('has the expected classes', () => {
      expect(dataTableExpandableRow.hasClass('bx--parent-row-v2')).toEqual(
        true
      );
    });
  });
});
