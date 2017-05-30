import GridPanel from '../GridPanel';
import React from 'react';
import { shallow, mount } from 'enzyme';

jest.unmock('../GridPanel');

const shallowRender = props => shallow(<GridPanel {...props} />);
const fullRender = props => mount(<GridPanel {...props} />);

describe('GridPanel', () => {
  describe('check if props are rendered correctly', () => {
    const columns = [
      {
        name: 'column1',
        title: 'column1',
        render: rowData => rowData.column1,
        width: 50,
      },
      {
        name: 'column2',
        title: 'column2',
        sortable: true,
        render: rowData => rowData.column2,
        width: 25,
      },
      {
        name: 'column3',
        title: 'column3',
        render: rowData => rowData.column3,
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
        changePage: jest.fn(),
        emptyText: 'emptyyy',
        expandedDetailIndex: null,
        expandedRowIndices: [],
        isFetching: false,
        localStorageKey: 'testGrid1',
        name: '',
        onSort: jest.fn(),
        page: 1,
        pageSizes: [5, 10, 15],
        refreshGrid: jest.fn(),
        resetGrid: jest.fn(),
        totalItems: 3,
        columns,
        data,
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        showPager: true,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard grid - fetching', () => {
      const wrapper = shallowRender({
        changePage: jest.fn(),
        emptyText: 'emptyyy',
        expandedDetailIndex: null,
        expandedRowIndices: [],
        isFetching: true,
        localStorageKey: 'testGrid2',
        name: '',
        onSort: jest.fn(),
        page: 1,
        refreshGrid: jest.fn(),
        resetGrid: jest.fn(),
        totalItems: 3,
        columns,
        data: [],
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        showPager: true,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard grid - empty', () => {
      const wrapper = shallowRender({
        changePage: jest.fn(),
        emptyText: 'emptyyy griddd',
        expandedDetailIndex: null,
        expandedRowIndices: [],
        isFetching: false,
        localStorageKey: 'testGrid3',
        name: '',
        onSort: jest.fn(),
        page: 1,
        refreshGrid: jest.fn(),
        resetGrid: jest.fn(),
        totalItems: 3,
        totalPages: 1,
        columns,
        data: [],
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        showPager: true,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
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
      const wrapper = shallowRender({
        changePage: jest.fn(),
        emptyText: 'emptyyy griddd',
        expandedDetailIndex: null,
        expandedRowIndices: [1, 2],
        isFetching: false,
        localStorageKey: 'testGrid4',
        name: '',
        onSort: jest.fn(),
        page: 1,
        refreshGrid: jest.fn(),
        resetGrid: jest.fn(),
        totalItems: 3,
        columns,
        data,
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: (rowData, index) => `${rowData.expander}-${index}`,
        showPager: true,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
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
      const wrapper = shallowRender({
        changePage: jest.fn(),
        emptyText: 'emptyyy griddd',
        expandedDetailIndex: 2,
        expandedRowIndices: [],
        isFetching: false,
        localStorageKey: 'testGrid5',
        name: '',
        onSort: jest.fn(),
        page: 1,
        refreshGrid: jest.fn(),
        resetGrid: jest.fn(),
        totalItems: 3,
        columns,
        data,
        renderDetailExpansion: rowData =>
          `${rowData.column1}-${rowData.column3}-${rowData.column2}-${rowData.expander}`,
        renderRowExpansion: jest.fn(),
        showPager: true,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard grid - hidden pagination toolbar', () => {
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
        changePage: jest.fn(),
        emptyText: 'emptyyy',
        expandedDetailIndex: null,
        expandedRowIndices: [],
        isFetching: false,
        name: '',
        onSort: jest.fn(),
        page: 1,
        pageSizes: [5, 10, 15],
        refreshGrid: jest.fn(),
        resetGrid: jest.fn(),
        totalItems: 3,
        columns,
        data,
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        showPager: false,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('check if the actions are triggered correctly', () => {
    describe('grid gets initialized from localStorage', () => {
      localStorage.setItem(
        'testLocal',
        JSON.stringify({
          // eslint-disable-line no-undef
          testGrid13: {
            columns: [
              {
                name: 'column1',
                title: 'column1',
                width: 35,
              },
              {
                name: 'column2',
                title: 'column2',
                sortable: true,
                width: 40,
              },
              {
                name: 'column3',
                title: 'column3',
                width: 25,
              },
            ],
          },
        })
      );
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          render: rowData => rowData.column1,
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          render: rowData => rowData.column2,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          render: rowData => rowData.column3,
          width: 25,
        },
      ];
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
      const wrapper = fullRender({
        changePage: jest.fn(),
        emptyText: 'emptyyy',
        expandedDetailIndex: null,
        expandedRowIndices: [],
        isFetching: false,
        localStorageKey: 'testLocal',
        name: 'testGrid13',
        onSort: jest.fn(),
        page: 1,
        refreshGrid: jest.fn(),
        resetGrid: jest.fn(),
        totalItems: 3,
        columns,
        data,
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        showPager: true,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
      });

      it('initiateColumns sets the correct state', () => {
        columns[0].width = 35;
        columns[1].width = 40;
        columns[2].width = 25;

        expect(wrapper.state().columns).toEqual(columns);
      });
    });

    describe('props gets updated', () => {
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          render: rowData => rowData.column1,
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          render: rowData => rowData.column2,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          render: rowData => rowData.column3,
          width: 25,
        },
      ];
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
      const wrapper = fullRender({
        changePage: jest.fn(),
        emptyText: 'emptyyy',
        expandedDetailIndex: null,
        expandedRowIndices: [],
        isFetching: false,
        localStorageKey: 'testGrid6',
        name: 'propsTest',
        onSort: jest.fn(),
        page: 1,
        refreshGrid: jest.fn(),
        resetGrid: jest.fn(),
        totalItems: 3,
        columns,
        data,
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        showPager: true,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
      });
      const newColumns = [
        {
          name: 'column1',
          title: 'column1',
          render: rowData => rowData.column1,
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          render: rowData => rowData.column2,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          render: rowData => `${rowData.column3}-displayed`,
          width: 25,
        },
      ];

      it('updateColumns updates the correct state', () => {
        wrapper.setProps({
          columns: newColumns,
        });

        expect(wrapper.state().columns).toEqual(newColumns);
      });
    });

    describe('column reset is triggered', () => {
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          render: rowData => rowData.column1,
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          render: rowData => rowData.column2,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          render: rowData => rowData.column3,
          width: 25,
        },
      ];
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
      const resetGridMock = jest.fn();
      const wrapper = fullRender({
        changePage: jest.fn(),
        changePageSize: jest.fn(),
        currentPage: 1,
        emptyText: 'emptyyy',
        expandedDetailIndex: null,
        expandedRowIndices: [],
        isFetching: false,
        loadNextPage: jest.fn(),
        loadPreviousPage: jest.fn(),
        localStorageKey: 'testGrid7',
        name: 'propsTest',
        onSort: jest.fn(),
        page: 1,
        pageLength: 25,
        refresh: jest.fn(),
        resetGrid: resetGridMock,
        totalCount: 3,
        totalPages: 1,
        columns,
        data,
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        showPager: true,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
      });

      it('resetGrid resets the grid to original props', () => {
        wrapper.find('.bx--grid-panel-settings').simulate('click', {
          stopPropagation: jest.fn(),
        });
        wrapper.find('.bx--grid-panel-settings__reset').simulate('click');

        expect(wrapper.state().columns).toEqual(columns);
        expect(resetGridMock).toBeCalled();
      });
    });

    describe('toggle column visibility is triggered', () => {
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          render: rowData => rowData.column1,
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          render: rowData => rowData.column2,
          width: 25,
          hideable: true,
          hidden: false,
        },
        {
          name: 'column3',
          title: 'column3',
          render: rowData => rowData.column3,
          width: 25,
        },
      ];
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
      const wrapper = fullRender({
        changePage: jest.fn(),
        changePageSize: jest.fn(),
        currentPage: 1,
        emptyText: 'emptyyy',
        expandedDetailIndex: null,
        expandedRowIndices: [],
        isFetching: false,
        loadNextPage: jest.fn(),
        loadPreviousPage: jest.fn(),
        localStorageKey: 'testGrid8',
        name: 'toggleColumnVisibilityTest',
        onSort: jest.fn(),
        page: 1,
        pageLength: 25,
        refresh: jest.fn(),
        resetGrid: jest.fn(),
        totalCount: 3,
        totalPages: 1,
        columns,
        data,
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        showPager: true,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
      });

      it('toggleColumnVisibility toggle the appropriate column', () => {
        wrapper.find('.bx--grid-panel-settings').simulate('click', {
          stopPropagation: jest.fn(),
        });
        wrapper.find('.bx--grid-panel-settings__toggle').simulate('click');

        columns[1].hidden = true;
        expect(wrapper.state().columns).toEqual(columns);
      });
    });

    describe('columns are resized', () => {
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          render: rowData => rowData.column1,
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          render: rowData => rowData.column2,
          width: 25,
          hideable: true,
          hidden: true,
        },
        {
          name: 'column3',
          title: 'column3',
          render: rowData => rowData.column3,
          width: 25,
        },
      ];
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
      const wrapper = fullRender({
        changePage: jest.fn(),
        changePageSize: jest.fn(),
        currentPage: 1,
        emptyText: 'emptyyy',
        expandedDetailIndex: null,
        expandedRowIndices: [],
        isFetching: false,
        loadNextPage: jest.fn(),
        loadPreviousPage: jest.fn(),
        localStorageKey: 'testGrid9',
        name: 'propsTest',
        onSort: jest.fn(),
        page: 1,
        pageLength: 25,
        refresh: jest.fn(),
        resetGrid: jest.fn(),
        totalCount: 3,
        totalPages: 1,
        columns,
        data,
        renderDetailExpansion: jest.fn(),
        renderRowExpansion: jest.fn(),
        showPager: true,
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
      });

      it('updateColumns updates the columns sizes', () => {
        wrapper
          .find('.bx--grid-head-cell__handle')
          .at(0)
          .simulate('dragStart', {
            clientX: 250,
          });
        wrapper.find('.bx--grid-head-cell__handle').at(0).simulate('dragEnd', {
          clientX: 125,
        });

        columns[0].width = 5;
        columns[2].width = 94.99999999999996;
        expect(wrapper.state().columns).toEqual(columns);
      });
    });
  });
});
