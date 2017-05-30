import Grid from '../Grid';
import React from 'react';
import { shallow, mount } from 'enzyme';

jest.unmock('../Grid');

const shallowRender = props => shallow(<Grid {...props} />);
const fullRender = props => mount(<Grid {...props} />);

describe('Grid', () => {
  describe('check if props are rendered correctly', () => {
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
        sortable: true,
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
    describe('standard grid - loaded', () => {
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
        emptyText: 'empty grid',
        expandedDetailIndex: 0,
        expandedRowIndices: [],
        isFetching: false,
        onSort: jest.fn(),
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: jest.fn(),
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard grid - fetching', () => {
      const wrapper = shallowRender({
        columns,
        data: [],
        emptyText: 'empty grid',
        expandedDetailIndex: 0,
        expandedRowIndices: [],
        isFetching: true,
        onSort: jest.fn(),
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: jest.fn(),
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard grid - empty', () => {
      const wrapper = shallowRender({
        columns,
        data: [],
        emptyText: 'empty grid',
        expandedDetailIndex: 0,
        expandedRowIndices: [],
        isFetching: false,
        onSort: jest.fn(),
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: jest.fn(),
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard grid - rows expanded', () => {
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
          expander: 'expand2',
        },
        {
          column1: 'stuff3',
          column2: 'more3',
          column3: 'test3',
          expander: 'expand3',
        },
      ];
      const wrapper = fullRender({
        columns,
        data,
        emptyText: 'empty grid',
        expandedDetailIndex: null,
        expandedRowIndices: [1, 2],
        isFetching: false,
        onSort: jest.fn(),
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: (rowData, index) => `${rowData.expander}-${index}`,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: jest.fn(),
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard grid - detail expanded', () => {
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
          expander: 'expand2',
        },
        {
          column1: 'stuff3',
          column2: 'more3',
          column3: 'test3',
          expander: 'expand3',
        },
      ];
      const wrapper = fullRender({
        columns,
        data,
        emptyText: 'empty grid',
        expandedDetailIndex: 2,
        expandedRowIndices: [],
        isFetching: false,
        onSort: jest.fn(),
        renderDetailExpansion: rowData =>
          `${rowData.column1}-${rowData.column3}-${rowData.column2}-${rowData.expander}`,
        renderRowExpansion: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: jest.fn(),
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('check if column sizes are calculated correctly', () => {
    describe('column sizes specified < 100', () => {
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
          sortable: true,
          render: data => data.column2,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          render: data => data.column3,
        },
        {
          name: 'column4',
          title: 'column4',
          render: data => data.column4,
        },
      ];
      const data = [
        {
          column1: 'stuff1',
          column2: 'more1',
          column3: 'test1',
          column4: 'col1',
        },
        {
          column1: 'stuff2',
          column2: 'more2',
          column3: 'test2',
          column4: 'col2',
        },
      ];
      const wrapper = shallowRender({
        columns,
        data,
        emptyText: 'empty grid',
        expandedDetailIndex: null,
        expandedRowIndices: [],
        isFetching: false,
        onSort: jest.fn(),
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: jest.fn(),
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('column sizes specified > 100', () => {
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
          sortable: true,
          render: data => data.column2,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          render: data => data.column3,
          width: 30,
        },
        {
          name: 'column4',
          title: 'column4',
          render: data => data.column4,
        },
      ];
      const data = [
        {
          column1: 'stuff1',
          column2: 'more1',
          column3: 'test1',
          column4: 'col1',
        },
        {
          column1: 'stuff2',
          column2: 'more2',
          column3: 'test2',
          column4: 'col2',
        },
      ];
      const wrapper = shallowRender({
        columns,
        data,
        emptyText: 'empty grid',
        expandedDetailIndex: null,
        expandedRowIndices: [],
        isFetching: false,
        onSort: jest.fn(),
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: jest.fn(),
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
