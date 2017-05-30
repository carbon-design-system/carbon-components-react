import GridBodyRow from '../GridBodyRow';
import React from 'react';
import { shallow } from 'enzyme';

jest.unmock('../GridBodyRow');

const shallowRender = props => shallow(<GridBodyRow {...props} />);

describe('GridBodyRow', () => {
  describe('check if props are rendered correctly', () => {
    describe('standard row - no row expansion', () => {
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          render: data => data.column1,
          width: 50,
          overflow: true,
        },
        {
          name: 'column2',
          title: 'column2',
          render: data => data.column2,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          render: data => data.column3,
          width: 25,
        },
      ];
      const wrapper = shallowRender({
        className: 'testRow',
        columns,
        data: {
          column1: 'stuff',
          column2: 'more',
          column3: 'test',
        },
        index: 2,
        renderRowExpansion: null,
        rowExpanded: false,
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard row - row expanded', () => {
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          render: data => data.column1,
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          render: data => data.column2,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          render: data => data.column3,
          width: 25,
        },
      ];
      const data = {
        column1: 'stuff',
        column2: 'more',
        column3: 'test',
        expander: 'expandData',
      };
      const wrapper = shallowRender({
        className: 'testRow',
        columns,
        data,
        index: 2,
        renderRowExpansion: (rowData, index) => `${rowData.expander}-${index}`,
        rowExpanded: true,
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
