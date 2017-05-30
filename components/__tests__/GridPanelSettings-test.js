import GridPanelSettings from '../GridPanelSettings';
import React from 'react';
import { shallow } from 'enzyme';

jest.unmock('../GridPanelSettings');

const shallowRender = props => shallow(<GridPanelSettings {...props} />);

describe('GridPanelSettings', () => {
  describe('check if props are rendered correctly', () => {
    describe('initial render', () => {
      const wrapper = shallowRender({
        items: [
          {
            name: 'column3',
            title: 'column3',
            hidden: true,
          },
          {
            name: 'column4',
            title: 'column4',
            hidden: false,
          },
        ],
        resetColumns: jest.fn(),
        toggleColumnVisibility: jest.fn(),
      });

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('Menu open state', () => {
      const wrapper = shallowRender({
        items: [
          {
            name: 'column6',
            title: 'column6',
            hidden: false,
          },
          {
            name: 'column8',
            title: 'column8',
            hidden: true,
          },
        ],
        resetColumns: jest.fn(),
        toggleColumnVisibility: jest.fn(),
      });

      wrapper.find('.bx--grid-panel-settings').simulate('click', {
        stopPropagation: jest.fn(),
      });
      wrapper.update();

      it('menu open renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('Menu close state', () => {
      const wrapper = shallowRender({
        items: [
          {
            name: 'column3',
            title: 'column3',
            hidden: true,
          },
          {
            name: 'column4',
            title: 'column4',
            hidden: false,
          },
        ],
        resetColumns: jest.fn(),
        toggleColumnVisibility: jest.fn(),
      });

      // First click to open the menu
      wrapper.find('.bx--grid-panel-settings').simulate('click', {
        stopPropagation: jest.fn(),
      });

      // Second click to close the menu - the actual test
      wrapper.find('.bx--grid-panel-settings').simulate('click', {
        stopPropagation: jest.fn(),
      });

      it('menu close renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('check if events are triggered properly', () => {
    const resetColumnsMock = jest.fn();
    const toggleColumnVisibilityMock = jest.fn();
    const wrapper = shallowRender({
      items: [
        {
          name: 'column3',
          title: 'column3',
          hidden: true,
        },
        {
          name: 'column4',
          title: 'column4',
          hidden: false,
        },
      ],
      resetColumns: resetColumnsMock,
      toggleColumnVisibility: toggleColumnVisibilityMock,
    });

    // Open the menu before clicking the buttons
    wrapper.find('.bx--grid-panel-settings').simulate('click', {
      stopPropagation: jest.fn(),
    });

    it('resetColumns is called', () => {
      wrapper.find('.bx--grid-panel-settings__reset').simulate('click');
      expect(resetColumnsMock).toBeCalled();
    });

    it('toggleColumnVisibility is called', () => {
      wrapper.find('.bx--grid-panel-settings__toggle').at(0).simulate('click');
      expect(toggleColumnVisibilityMock).toBeCalledWith({
        name: 'column3',
        title: 'column3',
        hidden: true,
      });
    });
  });
});
