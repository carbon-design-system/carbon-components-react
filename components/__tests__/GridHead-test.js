import GridHead from '../GridHead';
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

jest.unmock('../GridHead');

const shallowRender = props => shallow(<GridHead {...props} />);
const fullRender = props => mount(<GridHead {...props} />, { attach: true });

describe('Grid/Head', () => {
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
    describe('standard header - ASC sort', () => {
      const wrapper = shallowRender({
        columns,
        onSort: jest.fn(),
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

    describe('standard header - DESC sort', () => {
      const wrapper = shallowRender({
        columns,
        onSort: jest.fn(),
        sort: {
          direction: 'DESC',
          property: 'column2',
        },
        updateColumns: jest.fn(),
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('onSort is called correctly - if sortable is true', () => {
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
    const onSortMock = jest.fn();
    const wrapper = fullRender({
      columns,
      onSort: onSortMock,
      sort: {
        direction: 'ASC',
        property: 'column2',
      },
      updateColumns: jest.fn(),
    });

    it('onSort is triggered on click', () => {
      wrapper.find('.bx--grid-head__cell').at(1).simulate('click');
      expect(onSortMock).toBeCalledWith(columns[1]);
    });
  });

  describe('check if dragStart is performed correctly', () => {
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
    const wrapper = fullRender({
      columns,
      onSort: jest.fn(),
      sort: {
        direction: 'ASC',
        property: 'column2',
      },
      updateColumns: jest.fn(),
    });

    ReactDOM.findDOMNode(
      wrapper.node.cells.column1
    ).getBoundingClientRect = jest.fn(() => ({
      width: 120,
      height: 120,
      top: 200,
      left: 100,
      bottom: 0,
      right: 0,
    }));
    wrapper.find('.bx--grid-head-cell__handle').at(0).simulate('dragStart', {
      clientX: 220,
    });

    it('state is updated correctly on dragStart', () => {
      expect(wrapper.state()).toEqual({
        columns,
        resizeColumn: {
          column: columns[0],
          dragStartLocation: 220,
        },
        leftMarkerPosition: 100,
        rightMarkerPosition: 220,
        markerPositionTop: 200,
      });
    });
  });

  describe('check if dragOver is performed correctly', () => {
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
    describe('markerPosition gives more than 5% of grid size', () => {
      const wrapper = fullRender({
        columns,
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: jest.fn(),
      });

      wrapper.setState({
        resizeColumn: {
          column: columns[0],
          dragStartLocation: 220,
        },
        leftMarkerPosition: 100,
        rightMarkerPosition: 220,
        markerPositionTop: 200,
      });
      ReactDOM.findDOMNode(
        wrapper.node
      ).getBoundingClientRect = jest.fn(() => ({
        width: 500,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }));
      wrapper.find('.bx--grid-head-cell__handle').at(0).simulate('dragOver', {
        clientX: 200,
      });

      it('rightMarkerPosition is updated', () => {
        expect(wrapper.state()).toEqual({
          columns,
          resizeColumn: {
            column: columns[0],
            dragStartLocation: 220,
          },
          leftMarkerPosition: 100,
          rightMarkerPosition: 200,
          markerPositionTop: 200,
        });
      });
    });

    describe('markerPosition gives less than 5% of grid size', () => {
      const wrapper = fullRender({
        columns,
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: jest.fn(),
      });

      wrapper.setState({
        resizeColumn: {
          column: columns[0],
          dragStartLocation: 220,
        },
        leftMarkerPosition: 100,
        rightMarkerPosition: 220,
        markerPositionTop: 200,
      });
      ReactDOM.findDOMNode(
        wrapper.node
      ).getBoundingClientRect = jest.fn(() => ({
        width: 500,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }));
      wrapper.find('.bx--grid-head-cell__handle').at(0).simulate('dragOver', {
        clientX: 110,
      });

      it('rightMarkerPosition is unchanged', () => {
        expect(wrapper.state()).toEqual({
          columns,
          resizeColumn: {
            column: columns[0],
            dragStartLocation: 220,
          },
          leftMarkerPosition: 100,
          rightMarkerPosition: 220,
          markerPositionTop: 200,
        });
      });
    });
  });

  describe('check if dragEnd is performed correctly', () => {
    describe('column 1 is reduced to half', () => {
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          width: 25,
        },
      ];
      const updateColumnsMock = jest.fn();
      const wrapper = fullRender({
        columns,
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: updateColumnsMock,
      });

      wrapper.setState({
        resizeColumn: {
          column: columns[0],
          dragStartLocation: 250,
        },
        leftMarkerPosition: 0,
        rightMarkerPosition: 250,
        markerPositionTop: 0,
      });
      ReactDOM.findDOMNode(
        wrapper.node
      ).getBoundingClientRect = jest.fn(() => ({
        width: 500,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column1
      ).getBoundingClientRect = jest.fn(() => ({
        width: 250,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 250,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column2
      ).getBoundingClientRect = jest.fn(() => ({
        width: 125,
        height: 100,
        top: 0,
        left: 250,
        bottom: 0,
        right: 125,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column3
      ).getBoundingClientRect = jest.fn(() => ({
        width: 125,
        height: 100,
        top: 0,
        left: 375,
        bottom: 0,
        right: 0,
      }));
      wrapper.find('.bx--grid-head-cell__handle').at(0).simulate('dragEnd', {
        clientX: 125,
      });

      const recalculatedColumns = [
        {
          name: 'column1',
          title: 'column1',
          width: 25,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          width: 37.5,
        },
        {
          name: 'column3',
          title: 'column3',
          width: 37.5,
        },
      ];
      it('state is updated correctly on dragEnd', () => {
        expect(wrapper.state()).toEqual({
          columns: recalculatedColumns,
          resizeColumn: null,
          leftMarkerPosition: -9999,
          rightMarkerPosition: -9999,
          markerPositionTop: -9999,
        });
      });

      it('props.updateColumns is called with the updated columns', () => {
        expect(updateColumnsMock).toBeCalledWith(recalculatedColumns);
      });
    });

    describe('column 2 is reduced to 80%', () => {
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          width: 25,
        },
      ];
      const updateColumnsMock = jest.fn();
      const wrapper = fullRender({
        columns,
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: updateColumnsMock,
      });

      wrapper.setState({
        resizeColumn: {
          column: columns[1],
          dragStartLocation: 375,
        },
        leftMarkerPosition: 0,
        rightMarkerPosition: 375,
        markerPositionTop: 0,
      });
      ReactDOM.findDOMNode(
        wrapper.node
      ).getBoundingClientRect = jest.fn(() => ({
        width: 500,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column1
      ).getBoundingClientRect = jest.fn(() => ({
        width: 250,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 250,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column2
      ).getBoundingClientRect = jest.fn(() => ({
        width: 125,
        height: 100,
        top: 0,
        left: 250,
        bottom: 0,
        right: 125,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column3
      ).getBoundingClientRect = jest.fn(() => ({
        width: 125,
        height: 100,
        top: 0,
        left: 375,
        bottom: 0,
        right: 0,
      }));
      wrapper.find('.bx--grid-head-cell__handle').at(1).simulate('dragEnd', {
        clientX: 350,
      });

      const recalculatedColumns = [
        {
          name: 'column1',
          title: 'column1',
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          width: 20,
        },
        {
          name: 'column3',
          title: 'column3',
          width: 30,
        },
      ];
      it('state is updated correctly on dragEnd', () => {
        expect(wrapper.state()).toEqual({
          columns: recalculatedColumns,
          resizeColumn: null,
          leftMarkerPosition: -9999,
          rightMarkerPosition: -9999,
          markerPositionTop: -9999,
        });
      });

      it('props.updateColumns is called with the updated columns', () => {
        expect(updateColumnsMock).toBeCalledWith(recalculatedColumns);
      });
    });

    describe('column 1 is reduced to 4%', () => {
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          width: 25,
        },
      ];
      const updateColumnsMock = jest.fn();
      const wrapper = fullRender({
        columns,
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: updateColumnsMock,
      });

      wrapper.setState({
        resizeColumn: {
          column: columns[0],
          dragStartLocation: 250,
        },
        leftMarkerPosition: 0,
        rightMarkerPosition: 250,
        markerPositionTop: 0,
      });
      ReactDOM.findDOMNode(
        wrapper.node
      ).getBoundingClientRect = jest.fn(() => ({
        width: 500,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column1
      ).getBoundingClientRect = jest.fn(() => ({
        width: 250,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 250,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column2
      ).getBoundingClientRect = jest.fn(() => ({
        width: 125,
        height: 100,
        top: 0,
        left: 250,
        bottom: 0,
        right: 125,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column3
      ).getBoundingClientRect = jest.fn(() => ({
        width: 125,
        height: 100,
        top: 0,
        left: 375,
        bottom: 0,
        right: 0,
      }));
      wrapper.find('.bx--grid-head-cell__handle').at(0).simulate('dragEnd', {
        clientX: 15,
      });

      const recalculatedColumns = [
        {
          name: 'column1',
          title: 'column1',
          width: 5,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          width: 47.5,
        },
        {
          name: 'column3',
          title: 'column3',
          width: 47.5,
        },
      ];
      it('state is updated correctly on dragEnd', () => {
        expect(wrapper.state()).toEqual({
          columns: recalculatedColumns,
          resizeColumn: null,
          leftMarkerPosition: -9999,
          rightMarkerPosition: -9999,
          markerPositionTop: -9999,
        });
      });

      it('props.updateColumns is called with the updated columns', () => {
        expect(updateColumnsMock).toBeCalledWith(recalculatedColumns);
      });
    });

    describe('column 1 is increased to 150%', () => {
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          width: 25,
        },
      ];
      const updateColumnsMock = jest.fn();
      const wrapper = fullRender({
        columns,
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: updateColumnsMock,
      });

      wrapper.setState({
        resizeColumn: {
          column: columns[0],
          dragStartLocation: 500,
        },
        leftMarkerPosition: 0,
        rightMarkerPosition: 500,
        markerPositionTop: 0,
      });
      ReactDOM.findDOMNode(
        wrapper.node
      ).getBoundingClientRect = jest.fn(() => ({
        width: 1000,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column1
      ).getBoundingClientRect = jest.fn(() => ({
        width: 500,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 500,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column2
      ).getBoundingClientRect = jest.fn(() => ({
        width: 250,
        height: 100,
        top: 0,
        left: 500,
        bottom: 0,
        right: 250,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column3
      ).getBoundingClientRect = jest.fn(() => ({
        width: 250,
        height: 100,
        top: 0,
        left: 750,
        bottom: 0,
        right: 0,
      }));
      wrapper.find('.bx--grid-head-cell__handle').at(0).simulate('dragEnd', {
        clientX: 625,
      });

      const recalculatedColumns = [
        {
          name: 'column1',
          title: 'column1',
          width: 62.5,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          width: 18.75,
        },
        {
          name: 'column3',
          title: 'column3',
          width: 18.75,
        },
      ];
      it('state is updated correctly on dragEnd', () => {
        expect(wrapper.state()).toEqual({
          columns: recalculatedColumns,
          resizeColumn: null,
          leftMarkerPosition: -9999,
          rightMarkerPosition: -9999,
          markerPositionTop: -9999,
        });
      });

      it('props.updateColumns is called with the updated columns', () => {
        expect(updateColumnsMock).toBeCalledWith(recalculatedColumns);
      });
    });

    describe('column 2 is increased to 150%', () => {
      const columns = [
        {
          name: 'column1',
          title: 'column1',
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          width: 25,
        },
        {
          name: 'column3',
          title: 'column3',
          width: 25,
        },
      ];
      const updateColumnsMock = jest.fn();
      const wrapper = fullRender({
        columns,
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
        updateColumns: updateColumnsMock,
      });

      wrapper.setState({
        resizeColumn: {
          column: columns[1],
          dragStartLocation: 750,
        },
        leftMarkerPosition: 0,
        rightMarkerPosition: 750,
        markerPositionTop: 0,
      });
      ReactDOM.findDOMNode(
        wrapper.node
      ).getBoundingClientRect = jest.fn(() => ({
        width: 1000,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column1
      ).getBoundingClientRect = jest.fn(() => ({
        width: 500,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 500,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column2
      ).getBoundingClientRect = jest.fn(() => ({
        width: 250,
        height: 100,
        top: 0,
        left: 500,
        bottom: 0,
        right: 250,
      }));
      ReactDOM.findDOMNode(
        wrapper.node.cells.column3
      ).getBoundingClientRect = jest.fn(() => ({
        width: 250,
        height: 100,
        top: 0,
        left: 750,
        bottom: 0,
        right: 0,
      }));

      wrapper.find('.bx--grid-head-cell__handle').at(1).simulate('dragEnd', {
        clientX: 875,
      });

      const recalculatedColumns = [
        {
          name: 'column1',
          title: 'column1',
          width: 50,
        },
        {
          name: 'column2',
          title: 'column2',
          sortable: true,
          width: 37.5,
        },
        {
          name: 'column3',
          title: 'column3',
          width: 12.5,
        },
      ];
      it('state is updated correctly on dragEnd', () => {
        expect(wrapper.state()).toEqual({
          columns: recalculatedColumns,
          resizeColumn: null,
          leftMarkerPosition: -9999,
          rightMarkerPosition: -9999,
          markerPositionTop: -9999,
        });
      });

      it('props.updateColumns is called with the updated columns', () => {
        expect(updateColumnsMock).toBeCalledWith(recalculatedColumns);
      });
    });
  });
});
