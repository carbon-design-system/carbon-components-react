import React from 'react';
import OverflowMenuItem from '../OverflowMenuItem';
import { shallow } from 'enzyme';

const shallowRender = props => shallow(<OverflowMenuItem {...props} />);

describe('OverflowMenuItem', () => {
  describe('Renders as expected', () => {
    it('should render a button and text as expected', () => {
      const wrapper = shallowRender({
        itemText: 'testing',
        onSelect() {},
      });

      const button = wrapper.find('button');

      expect(button.length).toEqual(1);
      expect(button.text()).toEqual('testing');
      expect(wrapper.type()).toEqual('li');
    });

    it('should have the correct classes', () => {
      const wrapper = shallowRender({
        itemText: 'testing',
        onSelect() {},
      });

      const button = wrapper.find('button');
      expect(button.hasClass('bx--overflow-menu-options__btn')).toEqual(true);
    });

    it('should have the correct class when hasDivider is true', () => {
      const wrapper = shallowRender({
        itemText: 'testing',
        onSelect() {},
        hasDivider: true,
      });

      expect(wrapper.hasClass('bx--overflow-menu--divider')).toEqual(true);
    });

    it('calls onClick function when clicked', () => {
      const clickFn = jest.fn();
      const wrapper = shallowRender({
        itemText: 'testing',
        closeMenu: () => {},
        onClick: clickFn,
      });

      const button = wrapper.find('button');
      button.simulate('click');
      expect(clickFn).toHaveBeenCalled();
    });

    it('calls onClick function when Space is pressed', () => {
      const spaceKey = 32;
      const clickFn = jest.fn();
      const wrapper = shallowRender({
        itemText: 'testing',
        closeMenu: () => {},
        onClick: clickFn,
      });

      const button = wrapper.find('button');
      button.simulate('keydown', { which: spaceKey });
      expect(clickFn).toHaveBeenCalled();
    });

    it('calls onClick function when Enter is pressed', () => {
      const enterKey = 13;
      const clickFn = jest.fn();
      const wrapper = shallowRender({
        itemText: 'testing',
        closeMenu: () => {},
        onClick: clickFn,
      });

      const button = wrapper.find('button');
      button.simulate('keydown', { which: enterKey });
      expect(clickFn).toHaveBeenCalled();
    });

    it('calls onKeyDown function when provided instead of onClick function', () => {
      const enterKey = 13;
      const clickFn = jest.fn();
      const keyFn = jest.fn();
      const wrapper = shallowRender({
        itemText: 'testing',
        closeMenu: () => {},
        onClick: clickFn,
        onKeyDown: keyFn,
      });

      const button = wrapper.find('button');
      button.simulate('keydown', { which: enterKey });
      expect(clickFn).not.toHaveBeenCalled();
      expect(keyFn).toHaveBeenCalled();
    });
  });
});
