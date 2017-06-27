import React from 'react';
import Slider from '../Slider';
import TextInput from '../TextInput';
import { mount, shallow } from 'enzyme';
import 'requestanimationframe';

describe('Slider', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <Slider id="slider" className="extra-class" value={50} min={0} max={100} step={1}>
        <TextInput id="input-for-slider" className="bx-slider-text-input"/>
      </Slider>
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.bx--text-input').length).toBe(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--slider-container')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      // expect(wrapper.find('.bx--slider')).hasClass('extra-class').toEqual(true);
    });

    it('can be disabled', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.props().disabled).toEqual(true);
    });

    it('can set value via props', () => {
      wrapper.setProps({ value: 55 });
      expect(wrapper.props().value).toEqual(55);
    });
  });

  describe('calcValue method', () => {
    const wrapper = mount(
      <Slider id="slider" className="extra-class" value={50} min={0} max={100} step={1}>
      </Slider>
    );

    it('returns correct value from event with a clientX', () => {
      const evt = {
        type: 'click',
        clientX: '1000',
      }
      expect(wrapper.instance().calcValue(evt).newValue).toEqual(100)
    });
  });

  describe('keyDown interactions', () => {
    const wrapper = mount(
      <Slider id="slider" className="extra-class" value={50} min={0} max={100} step={1}>
      </Slider>
    );

    it('steps the value up on right/up keyDown', () => {
      const thumb = wrapper.find('.bx--slider__thumb');
      thumb.simulate('keydown', {which: 38});
      expect(wrapper.state().value).toEqual(51);
    });

    wrapper.setProps({ value: 50 });

    it('steps the value up on left/down keyDown', () => {
      const thumb = wrapper.find('.bx--slider__thumb');
      thumb.simulate('keydown', {which: 40});
      expect(wrapper.state().value).toEqual(49);
    });
  });
});
