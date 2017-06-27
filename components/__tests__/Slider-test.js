import React from 'react';
import Slider from '../Slider';
import TextInput from '../TextInput';
import { mount } from 'enzyme';
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
      expect(wrapper.find('bx--slider-container')).toEqual(true);
    });

    it('renders extra classes passed in via className', () => {
      expect(wrapper.find('.bx--slider')).hasClass('extra-class').toEqual(true);
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

  describe('events', () => {
    it('click changes value', () => {
      const wrapper = mount(
        <Slider id="slider" className="extra-class" value={50} min={0} max={100} step={1}>
          <TextInput id="input-for-slider" className="bx-slider-text-input"/>
        </Slider>
      );

      const slider = wrapper.find('.bx--slider');

      slider.simulate('click', { clientX: 400 });
      expect(wrapper.state().value).toEqual(55);
    });
  });
});
