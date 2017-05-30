import GridHeadCell from '../GridHeadCell';
import React from 'react';
import { shallow } from 'enzyme';

jest.unmock('../GridHeadCell');

const shallowRender = props => shallow(<GridHeadCell {...props} />);

describe('GridHeadCell', () => {
  describe('check if props are rendered correctly', () => {
    describe('standard cell - no sort', () => {
      const wrapper = shallowRender({
        className: 'class1',
        column: {
          name: 'column2',
          title: 'column2',
          render: data => data.column2,
          width: 25,
        },
        dragEnd: jest.fn(),
        dragOver: jest.fn(),
        dragStart: jest.fn(),
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column3',
        },
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard cell - ASC sort', () => {
      const wrapper = shallowRender({
        className: 'class1',
        column: {
          name: 'column2',
          title: 'column2',
          sortable: true,
          render: data => data.column2,
          width: 25,
        },
        dragEnd: jest.fn(),
        dragOver: jest.fn(),
        dragStart: jest.fn(),
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column2',
        },
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('standard cell - DESC sort', () => {
      const wrapper = shallowRender({
        className: 'class1',
        column: {
          name: 'column2',
          title: 'column2',
          sortable: true,
          render: data => data.column2,
          width: 25,
        },
        dragEnd: jest.fn(),
        dragOver: jest.fn(),
        dragStart: jest.fn(),
        onSort: jest.fn(),
        sort: {
          direction: 'DESC',
          property: 'column2',
        },
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('check if events are triggered correctly', () => {
    describe('onSort is called correctly - if sortable is true', () => {
      const column = {
        name: 'column2',
        title: 'column2',
        sortable: true,
        render: data => data.column2,
        width: 25,
      };
      const onSortMock = jest.fn();
      const wrapper = shallowRender({
        className: 'class1',
        column,
        dragEnd: jest.fn(),
        dragOver: jest.fn(),
        dragStart: jest.fn(),
        onSort: onSortMock,
        sort: {
          direction: 'ASC',
          property: 'column3',
        },
      });

      it('onSort is triggered on click', () => {
        wrapper.simulate('click');
        expect(onSortMock).toBeCalledWith(column);
      });
    });

    describe('onSort is not called - if sortable is false', () => {
      const column = {
        name: 'column2',
        title: 'column2',
        sortable: false,
        render: data => data.column2,
        width: 25,
      };
      const onSortMock = jest.fn();
      const wrapper = shallowRender({
        className: 'class1',
        column,
        dragEnd: jest.fn(),
        dragOver: jest.fn(),
        dragStart: jest.fn(),
        onSort: onSortMock,
        sort: {
          direction: 'ASC',
          property: 'column3',
        },
      });

      it('onSort is triggered on click', () => {
        wrapper.simulate('click');
        expect(onSortMock).not.toBeCalled();
      });
    });

    describe('dragStart is called correctly', () => {
      const column = {
        name: 'column2',
        title: 'column2',
        render: data => data.column2,
        width: 25,
      };
      const onDragStartMock = jest.fn();
      const wrapper = shallowRender({
        className: 'class1',
        column,
        dragEnd: jest.fn(),
        dragOver: jest.fn(),
        dragStart: onDragStartMock,
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column3',
        },
      });

      it('onDragStart is triggered', () => {
        wrapper.find('.bx--grid-head-cell__handle').simulate('dragStart', {
          event: 'x',
        });
        expect(onDragStartMock).toBeCalledWith(
          {
            event: 'x',
          },
          column
        );
      });
    });

    describe('dragEnd is called correctly', () => {
      const column = {
        name: 'column2',
        title: 'column2',
        render: data => data.column2,
        width: 25,
      };
      const onDragEndMock = jest.fn();
      const wrapper = shallowRender({
        className: 'class1',
        column,
        dragEnd: onDragEndMock,
        dragOver: jest.fn(),
        dragStart: jest.fn(),
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column3',
        },
      });

      it('onDragEnd is triggered', () => {
        wrapper.find('.bx--grid-head-cell__handle').simulate('dragEnd', {
          event: 'x',
        });
        expect(onDragEndMock).toBeCalledWith(
          {
            event: 'x',
          },
          column
        );
      });
    });

    describe('dragOver is called correctly', () => {
      const column = {
        name: 'column2',
        title: 'column2',
        render: data => data.column2,
        width: 25,
      };
      const onDragOverMock = jest.fn();
      const wrapper = shallowRender({
        className: 'class1',
        column,
        dragEnd: jest.fn(),
        dragOver: onDragOverMock,
        dragStart: jest.fn(),
        onSort: jest.fn(),
        sort: {
          direction: 'ASC',
          property: 'column3',
        },
      });

      it('onDragOver is triggered', () => {
        wrapper.simulate('dragOver');
        expect(onDragOverMock).toBeCalled();
      });
    });
  });
});
