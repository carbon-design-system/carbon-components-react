import GridBody from '../GridBody';
import React from 'react';
import { shallow } from 'enzyme';

jest.unmock('../GridBody');

const shallowRender = props => shallow(<GridBody {...props} />);

describe('GridBody', () => {
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
  describe('check if props are rendered correctly', () => {
    describe('standard body - no row expansion', () => {
      const data = [
        {
          column1: 'stuff1',
          column2: 'more1',
          column3: 'test1',
        },
        {
          column1: 'stuff2',
          column2: 'more2',
          column3: 'test2',
        },
        {
          column1: 'stuff3',
          column2: 'more3',
          column3: 'test3',
        },
      ];
      const wrapper = shallowRender({
        columns,
        data,
        expandedDetailIndex: null,
        expandedRowIndices: [],
        renderDetailExpansion: null,
        renderRowExpansion: null,
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard body - row 2 expanded', () => {
      const data = [
        {
          column1: 'stuff1',
          column2: 'more1',
          column3: 'test1',
        },
        {
          column1: 'stuff2',
          column2: 'more2',
          column3: 'test2',
          expander: 'expand',
        },
        {
          column1: 'stuff3',
          column2: 'more3',
          column3: 'test3',
        },
      ];
      const wrapper = shallowRender({
        columns,
        data,
        expandedDetailIndex: null,
        expandedRowIndices: [2],
        renderDetailExpansion: (rowData, index) =>
          `${rowData.expander}-${index}`,
        renderRowExpansion: rowData =>
          `${rowData.column1}-${rowData.column3}-${rowData.column2}-${rowData.expander}`,
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard body - row 2 detail expanded', () => {
      const data = [
        {
          column1: 'stuff1',
          column2: 'more1',
          column3: 'test1',
        },
        {
          column1: 'stuff2',
          column2: 'more2',
          column3: 'test2',
          expander: 'expand',
        },
        {
          column1: 'stuff3',
          column2: 'more3',
          column3: 'test3',
        },
      ];
      const wrapper = shallowRender({
        columns,
        data,
        expandedDetailIndex: 2,
        expandedRowIndices: [],
        renderDetailExpansion: (rowData, index) =>
          `${rowData.expander}-${index}`,
        renderRowExpansion: rowData =>
          `${rowData.column1}-${rowData.column3}-${rowData.column2}-${rowData.expander}`,
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
